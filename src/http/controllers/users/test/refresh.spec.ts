import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";

describe("Refresh token e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to Refresh a token ", async ()=>{
        await request(app.server)
        .post("/users")
        .send({
            name: "john doe",
            email: "johndoe@gmail.com", 
            password:"123456"
        })

        const authResponse = await request(app.server)
        .post("/sessions")
        .send({
            email: "johndoe@gmail.com", 
            password:"123456"
        })

        const cookies = authResponse.get("Set-Cookie")

        if (!cookies) {
            throw new Error("No cookies were returned in the response");
        }

        const response = await request(app.server)
        .patch("/token/refresh")
        .set("Cookie", cookies)
        .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get("Set-Cookie")).toEqual([
            expect.stringContaining("refreshToken=")
        ])
    })
})
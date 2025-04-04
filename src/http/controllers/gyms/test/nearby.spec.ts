import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("nearby gyms e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able list nearby gyms", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app, "ADMIN")
        
        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "javascript gym",
                description: "testessssss",
                phone: "13231241",
                latitude: -27.0610928,
                longitute: -49.5229501,
            })


        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "typeScript gym",
                description: "testessssss",
                phone: "13231241",
                latitude: -27.2092052,
                longitute: -49.6401091,
            })


        const response = await request(app.server)
            .get("/gyms/nearby")
            .query({
                latitude: -27.0610928,
                longitute: -49.5229501,
            })
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (response.statusCode).toEqual(200)
        expect (response.body.gyms).toHaveLength(1)
        expect (response.body.gyms).toEqual([
            expect.objectContaining({
               title:"javascript gym"
            })
        ])
    })
})
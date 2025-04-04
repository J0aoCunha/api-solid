import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Profile e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to get user profile", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app)
        
        const profileResponse =  await request(app.server)
            .get("/me")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (profileResponse.statusCode).toEqual(200)
        expect (profileResponse.body.user).toEqual(
            expect.objectContaining({
            email:"johndoe@gmail.com"
            })
        )
    })
})
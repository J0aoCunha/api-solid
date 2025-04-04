import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";

describe("Create gym e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to create gym", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app, "ADMIN")
        
        const response =  await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "javascript gym",
                description: null,
                phone: null,
                latitude: -20.2523861,
                longitute: -40.2670547
            })

        expect (response.statusCode).toEqual(201)
    })
})
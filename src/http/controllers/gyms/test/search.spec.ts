import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("search gyms e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to search gyms by title", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app)
        
        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "javascript gym",
                description: null,
                phone: null,
                latitude: -20.2523861,
                longitute: -40.2670547
            })


        await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "typeScript gym",
                description: null,
                phone: null,
                latitude: -20.2523861,
                longitute: -40.2670547
            })


        const response = await request(app.server)
            .get("/gyms/search")
            .query({
                query: "javascript"
            })
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (response.statusCode).toEqual(201)
        expect (response.body.gyms).toHaveLength(1)
        expect (response.body.gyms).toEqual([
            expect.objectContaining({
                title:"javascript gym",
            })
        ])
    })
})
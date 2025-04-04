import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("check in gym e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to create a check-in", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app)

        const gym = await prisma.gym.create({
            data:{
                title: "javascript gym",
                latitude: -20.2523861,
                longitute: -40.2670547
            }
        })
        
        const response =  await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -20.2523861,
                longitute: -40.2670547
            })

        expect (response.statusCode).toEqual(201)
    })
})
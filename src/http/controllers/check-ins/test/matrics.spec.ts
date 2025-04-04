import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("check in metrics gym e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able get the count of check-ins", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{
                title: "javascript gym",
                latitude: -20.2523861,
                longitute: -40.2670547
            }
        })
        
         await prisma.checkIn.createMany({
            data:[
                {
                    gym_id:gym.id,
                    user_id: user.id
                },
                {
                    gym_id:gym.id,
                    user_id: user.id
                },
                {
                    gym_id:gym.id,
                    user_id: user.id
                }
            ]
        })

        const response =  await request(app.server)
            .get("/check-ins/metrics")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (response.statusCode).toEqual(200)
        expect (response.body.checkInsCount).toEqual(3)
    })
})
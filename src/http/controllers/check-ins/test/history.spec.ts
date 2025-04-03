import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";
import { CheckIn } from '@prisma/client';

describe("check in history gym e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to list a  history of check-in", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{
                title: "javascript gym",
                latitude: -20.2523861,
                longitute: -40.2670547
            }
        })
        
        const checkIns = await prisma.checkIn.createMany({
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
            .get("/check-ins/history")
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (response.statusCode).toEqual(200)
        expect (response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id:gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id:gym.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id:gym.id,
                user_id: user.id
            })
        ])
    })
})
import { afterAll, beforeAll, describe, expect, it} from "vitest";
import request from "supertest"
import { app } from "@/app";
import { CreateAndAuthenticateUser } from "@/utils/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Validate check in gym e2e", ()=>{

    beforeAll(async ()=>{
        await app.ready()
    })

    afterAll(async()=>{
        await app.close()
    })

    it("should be able to validate a check-in", async ()=>{
        const { token } = await CreateAndAuthenticateUser(app, "ADMIN")

        const user = await prisma.user.findFirstOrThrow()

        const gym = await prisma.gym.create({
            data:{
                title: "javascript gym",
                latitude: -20.2523861,
                longitute: -40.2670547
            }
        })

        let checkIn = await prisma.checkIn.create({
            data:{
                gym_id: gym.id,
                user_id: user.id
            }
        })
        
        const response =  await request(app.server)
            .patch(`/check-ins/${checkIn.id}/validate`)
            .set("Authorization", `Bearer ${token}`)
            .send()

        expect (response.statusCode).toEqual(204)

        checkIn = await prisma.checkIn.findUniqueOrThrow({
            where:{
                id: checkIn.id
            }
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
    })
})
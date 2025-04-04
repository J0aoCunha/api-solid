import { prisma } from "@/lib/prisma"
import { FastifyInstance } from "fastify"
import request from "supertest"
import { hash } from "bcryptjs";

export async function CreateAndAuthenticateUser(app: FastifyInstance, role?: "ADMIN" | "MEMBER"){
    await prisma.user.create({
        data:{
            name: "john doe",
            email: "johndoe@gmail.com", 
            password_hash:await hash("123456", 6),
            role: role
        }
    })

    const authResponse = await request(app.server)
    .post("/sessions")
    .send({
        email: "johndoe@gmail.com", 
        password:"123456"
    })

    const { token } = authResponse.body


    return {
        token
    }
}
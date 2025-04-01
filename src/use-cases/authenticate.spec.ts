import { beforeEach, describe, expect, it } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials";

let sut: AuthenticateUseCase
let usersRepository: InMemoryUserRepository
describe("Authenticate Use Case", ()=>{

    beforeEach(()=>{
         usersRepository = new InMemoryUserRepository()
         sut = new AuthenticateUseCase(usersRepository)
    })

    it("should be able to authenticate",async ()=>{
        await usersRepository.create({
            name: "john doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6)
        })

        const { user } = await sut.execute({
            email: "johndoe@gmail.com",
            password: "123456"
        })


        expect(user.id).toEqual(expect.any(String))
    })

    it("should be able to authenticate with a wrong email",async ()=>{
        await expect(()=>
             sut.execute({
                email: "johndoe@gmail.com",
                password: "123123"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it("should be able to authenticate to a wrong password",async ()=>{
      await usersRepository.create({
            name: "john doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6)
        })

        await expect(()=>
           sut.execute({
                email: "johndoe@gmail.com",
                password: "123123"
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

})
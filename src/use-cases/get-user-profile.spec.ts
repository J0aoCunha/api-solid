import { beforeEach, describe, expect, it } from "vitest";
import {  hash } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundExists } from "./errors/resource-not-found-error";

let sut: GetUserProfileUseCase
let usersRepository: InMemoryUserRepository
describe("get user profile Use Case", ()=>{

    beforeEach(()=>{
         usersRepository = new InMemoryUserRepository()
         sut = new GetUserProfileUseCase(usersRepository)
    })

    it("should be able to get user profile",async ()=>{
        const createdUser = await usersRepository.create({
            name: "john doe",
            email: "johndoe@gmail.com",
            password_hash: await hash("123456", 6)
        })

        const {user} = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual("john doe")
    })

    it("should be able to get profile with wrong id ",async ()=>{
        await expect(()=>
             sut.execute({
               userId: "non-existing-id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundExists)
    })

    
})
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "../register";
import { compare } from "bcryptjs";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "../errors/user-already-exists";

let usersRepository: InMemoryUserRepository
let sut: RegisterUseCase
describe("Register Use Case", ()=>{

    beforeEach(()=>{
         usersRepository = new InMemoryUserRepository()
         sut = new RegisterUseCase(usersRepository)
    })

    it("should hash user password upon registration",async ()=>{
        const { user } = await sut.execute({
            name:"john doe",
            email:"johndoe2@gmail.com",
            password: "123456"
        })

        const isPasswordCorrectlyHashed = await compare(
            '123456',
            user.password_hash
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })

    it("should not be able to register with same email",async ()=>{ 
        const email = "johndoe2@gmail.com"

        await sut.execute({
            name:"john doe",
            email,
            password: "123456"
        })

        await expect(()=>
            sut.execute({
                name:"john doe",
                email,
                password: "123456"
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)

    })

    it("should be able to register",async ()=>{
        const { user } = await sut.execute({
            name:"john doe",
            email:"johndoe2@gmail.com",
            password: "123456"
        })

        expect(user.id).toEqual(expect.any(String))
    })
})
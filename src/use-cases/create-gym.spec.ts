import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository';
import { CreateGymUseCase } from "./create-gym";

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase
describe("Create gym Use Case", ()=>{

    beforeEach(()=>{
         gymsRepository = new InMemoryGymsRepository()
         sut = new CreateGymUseCase(gymsRepository)
    })

    it("should to create gym",async ()=>{
        const { gym } = await sut.execute({
            title: "javascript gym",
            phone: null,
            description: null,
            latitude: -20.2523861,
            longitute: -40.2670547
        })

        expect(gym.id).toEqual(expect.any(String))
    })

})
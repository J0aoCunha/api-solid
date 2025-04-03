import {  beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymsUseCase } from "../search-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase
describe("fetch user Check-ins history Use Case", ()=>{

    beforeEach(async ()=>{
         gymsRepository = new InMemoryGymsRepository()
         sut = new SearchGymsUseCase(gymsRepository)
    })

    it("should be able to search for gyms",async ()=>{
        await gymsRepository.create({
            title: "javaScript gym",
            phone: null,
            description: null, 
            longitute: 0,
            latitude: 0,
        })

        await gymsRepository.create({
            title: "typeScript gym",
            phone: null,
            description: null, 
            longitute: 0,
            latitude: 0,
        })

        const { gyms } = await sut.execute({
            query: "javaScript", 
            page: 1
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:"javaScript gym"}),
        ])
    })
    it("should be able to fetch paginated gym search",async ()=>{

        for(let i = 1; i <= 22; i++){
            await gymsRepository.create({
                title: `javaScript gym ${i}`,
                phone: null,
                description: null, 
                longitute: 0,
                latitude: 0,
            })
        }
        
        const { gyms } = await sut.execute({
            query:'javaScript',
            page: 2
        })

        expect(gyms).toHaveLength(2)
        expect(gyms).toEqual([
            expect.objectContaining({title:"javaScript gym 21"}),
            expect.objectContaining({title:"javaScript gym 22"})
        ])
    })

})
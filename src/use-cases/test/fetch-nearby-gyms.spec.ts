import {  beforeEach, describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase
describe("fetch nearby gyms Use Case", ()=>{

    beforeEach(async ()=>{
         gymsRepository = new InMemoryGymsRepository()
         sut = new FetchNearbyGymsUseCase(gymsRepository)
    })

    it("should be able to fetch nearby gyms",async ()=>{
        await gymsRepository.create({
            title: "near gym",
            phone: null,
            description: null, 
            longitute: -40.2941075,
            latitude: -20.3093553,
        })
        
        await gymsRepository.create({
            title: "far gym",
            phone: null,
            description: null, 
            longitute: -40.2701668,
            latitude: -20.1669944,
        })

        const { gyms } = await sut.execute({
            userLongitude: -40.2701668,
            userLatitude: -20.1669944,
        })

        expect(gyms).toHaveLength(1)
        expect(gyms).toEqual([
            expect.objectContaining({title:"far gym"}),
        ])
    })
})
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";

import { ValidadeCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundExists } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validate-error";


let checkInRepository: InMemoryCheckInsRepository
let sut: ValidadeCheckInUseCase
describe("Validate Check-ins Use Case", ()=>{

    beforeEach(async ()=>{
         checkInRepository = new InMemoryCheckInsRepository()
         sut = new ValidadeCheckInUseCase(checkInRepository)


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it("should be able to validate the check-in",async ()=>{
        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

       const { checkIn }= await sut.execute({
            checkInId: createdCheckIn.id
        })

        expect(checkIn.validated_at).toEqual(expect.any(Date))
        expect(checkInRepository.items[0].validated_at).toEqual(expect.any(Date))
    })

    it("should be not be able to validate an inexistent check-in",async ()=>{
        await expect(()=>
            sut.execute({
                checkInId: "inexistent-check-in-id"
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundExists)
    })

    it('should not be able to validate the check-in after 20min of its created', async ()=>{
        vi.setSystemTime(new Date(2023, 0, 1, 13,20))

        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-01",
            user_id: "user-01"
        })

        const twentyOneMinutesInMs = 1000*60*21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

       await expect(()=>sut.execute({
        checkInId: createdCheckIn.id
        }) 
        ).rejects.toBeInstanceOf(LateCheckInValidationError)
    })

})
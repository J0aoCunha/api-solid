import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "../check-ins";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { MaxNumberOfCheckInsError } from "../errors/max-number-of-check-ins-error";
import { MaxDistanceError } from "../errors/max-distance-error";

let checkInRepository: InMemoryCheckInsRepository
let gymRepository: InMemoryGymsRepository
let sut: CheckInUseCase
describe("Check-ins Use Case", ()=>{

    beforeEach(async ()=>{
         checkInRepository = new InMemoryCheckInsRepository()
         gymRepository = new InMemoryGymsRepository()
         sut = new CheckInUseCase(checkInRepository,gymRepository)

         
        await  gymRepository.create({
            id: "gym-01",
            title: "javascript gym",
            phone: null,
            description: null,
            latitude: 0,
            longitute: 0
        })


        vi.useFakeTimers()
    })

    afterEach(()=>{
        vi.useRealTimers()
    })

    it("should be able to check in",async ()=>{

        const { checkIn } = await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should not be able to check in twice on the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));
    
        await sut.execute({
            gymId: 'gym-01',
            userId: 'user-01', 
            userLatitude: 0,
            userLongitude: 0
        });
    
        await expect(()=>
            sut.execute({
                gymId:'gym-01',
                userId:'user-01',
                userLatitude: 0,
                userLongitude: 0
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
    });

    it("should not be able to check in twice but in different date",async ()=>{
        vi.setSystemTime(new Date(2022,0, 20, 8, 0,0))

        await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

        vi.setSystemTime(new Date(2022,0, 21, 8, 0,0))
        
        const { checkIn } = await sut.execute({
            gymId:'gym-01',
            userId:'user-01',
            userLatitude: 0,
            userLongitude: 0
        })

         expect(checkIn.id).toEqual(expect.any(String))
    })

    it("should be not able to check in on distant gym",async ()=>{
        gymRepository.create({
            id:"gym-02",
            description:"",
            title: "academia javascript",
            phone:"",
            latitude: -20.3093553,
            longitute:-40.2941075
        })

        
        await expect(()=>sut.execute({
            gymId:'gym-02',
            userId:'user-01',
            userLatitude: -20.2523861,
            userLongitude: -40.2670547
        })).rejects.toBeInstanceOf(MaxDistanceError)
    })
})
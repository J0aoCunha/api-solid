import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '../repositories/check-ins-repository';
import { ResourceNotFoundExists } from './errors/resource-not-found-error';
import dayjs from 'dayjs';
import { LateCheckInValidationError } from './errors/late-check-in-validate-error';


interface ValidadeCheckInUseCaseRequest{
    checkInId: string
}

interface  ValidadeCheckInUseCaseResponse {
    checkIn: CheckIn
}


export class ValidadeCheckInUseCase{
    constructor(
        private checkInsRepository: CheckInRepository,
    ){}

    async execute({
     checkInId
    }:ValidadeCheckInUseCaseRequest): Promise<ValidadeCheckInUseCaseResponse>{
        const checkIn = await this.checkInsRepository.FinById(checkInId)

        if(!checkIn){
            throw new ResourceNotFoundExists()
        }
        
        const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(checkIn.created_at, "minutes")

        if(distanceInMinutesFromCheckInCreation > 20){
            throw new LateCheckInValidationError()
        }

        checkIn.validated_at = new Date()

        await this.checkInsRepository.save(checkIn)
        
        return {checkIn}
    }
}
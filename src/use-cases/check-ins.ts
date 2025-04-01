import { CheckIn } from '@prisma/client';
import { CheckInRepository } from '../repositories/check-ins-repository';
import { GymRepository } from '../repositories/gyms-repository';
import { ResourceNotFoundExists } from './errors/resource-not-found-error';
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-cooredenades';
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins-error';
import { MaxDistanceError } from './errors/max-distance-error';

interface CheckInUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}

interface  CheckInUseCaseResponse {
    checkIn: CheckIn
}


export class CheckInUseCase{
    constructor(
        private checkInsRepository: CheckInRepository,
        private gymRepository: GymRepository
    ){}

    async execute({
        userId, 
        gymId,
        userLatitude,
        userLongitude
    }:CheckInUseCaseRequest): Promise<CheckInUseCaseResponse>{
        const gym = await this.gymRepository.findById(gymId)

        if(!gym){
            throw new ResourceNotFoundExists()
        }

        
        const distance = getDistanceBetweenCoordinates(
            {latitude: userLatitude, longitude: userLongitude}, 
            {latitude: gym.latitude.toNumber(), longitude: gym.longitute.toNumber()}
        )

        const MAX_DISTANCE_IN_KILOMETERS =  0.1

        if(distance > MAX_DISTANCE_IN_KILOMETERS){
            throw new MaxDistanceError()
        }

        const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
            userId, new Date()
        )

        if(checkInOnSameDay){
            throw new MaxNumberOfCheckInsError()
        }

        const checkIn = await this.checkInsRepository.create({
            gym_id: gymId,
            user_id: userId
        })

        return {checkIn}
    }
}
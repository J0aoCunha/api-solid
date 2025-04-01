import { Gym} from "@prisma/client"
import { GymRepository } from "@/repositories/gyms-repository"

interface CreateGymUseCaseRequest {
  title: string,
  description: string | null,
  phone: string|null,
  latitude: number,
  longitute: number
}

interface CreateGymUseCaseResponse{
    gym: Gym
}

export class CreateGymUseCase {

    constructor(private gymsRepository: GymRepository){}

    async execute({description,latitude,longitute,phone,title}:CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse>{

        const gym = await this.gymsRepository.create({
            description,latitude,longitute,phone,title
        })

       return {gym}

    }
}


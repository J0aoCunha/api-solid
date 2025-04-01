import { Gym, Prisma } from "@prisma/client"
import { findManyNearbyParams, GymRepository } from "../gyms-repository"
import { randomUUID } from "crypto"
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-cooredenades"

 class InMemoryGymsRepository implements GymRepository{
   public items: Gym[] = []

   async findById(id: string){
        const gym =  this.items.find(item => item.id === id)

        if(!gym){
            return null
        }

        return gym
    }

       async  create(data: Prisma.GymCreateInput){
            const gym = {
                id: data.id ?? randomUUID(),
                title: data.title,
                description : data.description ?? null,
                phone: data.phone ?? null,
                longitute: new Prisma.Decimal(data.longitute.toString()),
                latitude: new Prisma.Decimal(data.latitude.toString()),
                created_at: new Date()
            }
    
            this.items.push(gym)
    
            return gym
        }

        async searchMany(query: string, page: number){
            return this.items.filter((item)=>item.title.includes(query)).slice((page-1)*20, page*20)
        }

        async findManyNearby(params: findManyNearbyParams){
            return this.items.filter(item => {
                const distance = getDistanceBetweenCoordinates(
                    {latitude: item.latitude.toNumber(), longitude: item.longitute.toNumber()},
                    {latitude: params.latitude, longitude: params.longitude}
                )

                return distance < 10
            })
        }
}

export {InMemoryGymsRepository}
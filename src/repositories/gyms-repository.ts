import { Gym, Prisma} from "@prisma/client";

export interface findManyNearbyParams {
    latitude:number, 
    longitute: number
}


export interface GymRepository{
    findById(id: string):  Promise<Gym|null>
    searchMany(query: string, page: number): Promise<Gym[]>
    findManyNearby(params: findManyNearbyParams): Promise<Gym[]>
    create(data: Prisma.GymCreateInput): Promise<Gym>
}
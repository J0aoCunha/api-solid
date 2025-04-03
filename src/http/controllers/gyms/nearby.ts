import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-nearby-gyms-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
    const nearbyGymQuerySchema= z.object({
        latitude: z.coerce.number().refine(value=>{
            return Math.abs(value) <= 90
        }),
        longitute: z.coerce.number().refine(value=>{
            return Math.abs(value) <= 180
        }),
    })

    const { latitude, longitute } = nearbyGymQuerySchema.parse(request.query);

    const UseCase = makeFetchNearbyGymsUseCase()
    const {gyms}= await UseCase.execute({
        userLatitude:latitude, 
        userLongitude:longitute
    })

    return reply.status(200).send({gyms})
}
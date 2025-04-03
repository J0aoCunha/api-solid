import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
    const CheckInParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckInsBodySchema= z.object({
        latitude: z.number().refine(value=>{
            return Math.abs(value) <= 90
        }),
        longitute: z.number().refine(value=>{
            return Math.abs(value) <= 180
        }),
    })

    const { gymId } = CheckInParamsSchema.parse(request.params);
    const { latitude, longitute } = createCheckInsBodySchema.parse(request.body);

    const UseCase = makeCheckInUseCase()
    await UseCase.execute({
        userLatitude:latitude, 
        userLongitude:longitute,
        gymId,
        userId: request.user.sub
    })

    return reply.status(201).send()
}
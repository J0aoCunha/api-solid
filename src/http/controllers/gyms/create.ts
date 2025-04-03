import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
    const createGymBodySchema= z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine(value=>{
            return Math.abs(value) <= 90
        }),
        longitute: z.number().refine(value=>{
            return Math.abs(value) <= 180
        }),
    })

    const { title, description, phone, latitude, longitute} = createGymBodySchema.parse(request.body);

    const UseCase = makeCreateGymUseCase()
    await UseCase.execute({
        title, 
        description, 
        phone, 
        latitude, 
        longitute
    })

    return reply.status(201).send()
}
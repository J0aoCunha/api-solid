import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const search = async (request: FastifyRequest, reply: FastifyReply) => {
    const searchGymsQueryParams= z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { query, page} = searchGymsQueryParams.parse(request.query);

    const UseCase = makeSearchGymsUseCase()
    const {gyms}= await UseCase.execute({
        query, 
        page
    })

    return reply.status(201).send({gyms})
}
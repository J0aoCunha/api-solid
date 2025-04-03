import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-matrics-use-case';
import { FastifyReply, FastifyRequest } from "fastify";

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {

    const UseCase = makeGetUserMetricsUseCase()

    const { checkInsCount } = await UseCase.execute({
        userId: request.user.sub
    })

    return reply.status(200).send({ checkInsCount })
}
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-check-ins-history-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
    const checkInHistoryParamsSchema= z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkInHistoryParamsSchema.parse(request.query);

    const UseCase = makeFetchUserCheckInsHistoryUseCase()
    const { checkIns } = await UseCase.execute({
        page,
        userId: request.user.sub
    })

    return reply.status(200).send({checkIns})
}
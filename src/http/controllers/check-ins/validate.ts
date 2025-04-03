import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case';
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export const validate = async (request: FastifyRequest, reply: FastifyReply) => {
    const CheckInParamsSchema = z.object({
        checkInId: z.string().uuid()
    })

    const { checkInId } = CheckInParamsSchema.parse(request.params);

    const UseCase = makeValidateCheckInUseCase()
    await UseCase.execute({
        checkInId
    })

    return reply.status(204).send()
}
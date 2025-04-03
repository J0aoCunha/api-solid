import { ValidadeCheckInUseCase } from '../validate-check-in';
import { PrismaCheckInsRepository } from '../../repositories/prisma/prisma-check-ins-repository';

export function makeValidateCheckInUseCase(){
    const repository =  new PrismaCheckInsRepository()
    const useCase = new ValidadeCheckInUseCase(repository)
    
    return useCase
}
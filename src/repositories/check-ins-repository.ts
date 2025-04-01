import { CheckIn, Prisma } from "@prisma/client";

export interface CheckInRepository{
    FinById(id: string): Promise<CheckIn| null>
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    countByUserId(userId:string): Promise<number>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn| null>
    save(checkIn: CheckIn): Promise<CheckIn>
}
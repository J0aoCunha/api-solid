import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "crypto";

class InMemoryUserRepository implements UserRepository{
    public items: User[] = []

   async findById(id: string){
        const users =  this.items.find(item => item.id === id)

        if(!users){
            return null
        }

        return users
    }

    

   async  create(data: Prisma.UserCreateInput){
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password_hash: data.password_hash,
            created_at: new Date()
        }

        this.items.push(user)

        return user
    }
    async findByEmail(email: string){
       const users =  this.items.find(item => item.email === email)

        if(!users){
            return null
        }

        return users
    }
}
 export {InMemoryUserRepository}
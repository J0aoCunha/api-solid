import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";
import { refresh } from "./refresh";

export async function userRoutes(app: FastifyInstance){
    /*Non-authenticate routes*/
    app.post("/users", register)
    app.post("/sessions", authenticate)
    app.patch("/token/refresh", refresh)

    /*Authenticate routes*/
    app.get("/me",{onRequest: [ verifyJWT ] },profile)
}
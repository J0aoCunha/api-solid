import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verifyJWT } from "@/http/middlewares/verify-jwt";

export async function userRoutes(app: FastifyInstance){
    /*Non-authenticate routes*/
    app.post("/users", register)
    app.post("/sessions", authenticate)

    /*Authenticate routes*/
    app.get("/me",{onRequest: [ verifyJWT ] },profile)
}
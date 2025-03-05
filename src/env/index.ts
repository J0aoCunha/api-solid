import 'dotenv/config';
import { z } from 'zod';

// validar variáveis de ambiente
const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if(_env.success===false){
    console.error("invalid environment variables", _env.error.format());
    throw new Error("invalid environment variables");
}

export const env = _env.data
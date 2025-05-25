import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().startsWith("postgresql://"),
  NODE_ENV: z.enum(["development", "production"]).default("production"),

  CLOUDFLARE_BUCKET: z.string(),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  CLOUDFLARE_ACCESS_KEY_ID: z.string(),
  CLOUDFLARE_PUBLIC_URL: z.string().url(),
  CLOUDFLARE_SECRET_ACCESS_KEY: z.string(),
});

export const env = envSchema.parse(process.env);

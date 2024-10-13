import z from 'zod'

const envSchema = z.object({
  VITE_API_COMMENTS_TEST: z.string().url(),
  VITE_API_COMMENTS_LIVE: z.string().url(),
  VITE_ENVIRONMENT: z.string(),
})

// O process.env é tudo o que vem dentro do .env, quando eu executo o parse, ele vai verificar se o que está dentro do .env é igual ao que está dentro do envSchema
export const env = envSchema.parse(import.meta.env)

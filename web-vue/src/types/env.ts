import z from 'zod'

// Não esquecer de passar as envs para o .env e production, se não vai dar esse erro: tanto developer quanto production
/*
index-DPMisPo_.js:23 Uncaught ZodError: [
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "VITE_API_COMMENTS_TEST"
    ],
    "message": "Required"
  },
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "VITE_API_COMMENTS_LIVE"
    ],
    "message": "Required"
  },
  {
    "code": "invalid_type",
    "expected": "string",
    "received": "undefined",
    "path": [
      "VITE_ENVIRONMENT"
    ],
    "message": "Required"
  }
]
    at get error (index-DPMisPo_.js:23:83575)
    at dt.parse (index-DPMisPo_.js:23:85812)
    at index-DPMisPo_.js:31:3301
*/
const envSchema = z.object({
  VITE_API_COMMENTS_TEST: z.string().url().nullish(), // nullish é para aceitar null e undefined, porque em produção não vai ter o VITE_API_COMMENTS_TEST
  VITE_API_COMMENTS_LIVE: z.string().url(),
  VITE_ENVIRONMENT: z.string(),
})

// O process.env é tudo o que vem dentro do .env, quando eu executo o parse, ele vai verificar se o que está dentro do .env é igual ao que está dentro do envSchema
export const env = envSchema.parse(import.meta.env)

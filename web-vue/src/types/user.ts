import * as z from 'zod'

const userSchema = z.object({
  _id: z.string(),
  username: z.string().min(5).max(255),
  githubUser: z.string().min(5).max(255),
})

type User = z.infer<typeof userSchema>

export type { userSchema, User }

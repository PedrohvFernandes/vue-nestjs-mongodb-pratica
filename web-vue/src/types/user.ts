// import * as z from 'zod'

// const userSchema = z.object({
//   _id: z.string(),
//   username: z.string().min(5).max(255),
//   githubUser: z.string().min(5).max(255),
// })

// type UserType = z.infer<typeof userSchema>

interface UserResponse {
  _id: string
  // Tirei esses campos por enquanto, mesmo que o back mande, não vou usar.
  // createdAt: string
  // updatedAt: null | string
  user: { githubUser: string; username: string }
}

export type { UserResponse }

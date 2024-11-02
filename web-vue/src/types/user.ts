interface UserResponse {
  _id: string
  // Tirei esses campos por enquanto, mesmo que o back mande, não vou usar.
  // createdAt: string
  // updatedAt: null | string
  user: { githubUser: string; username: string }
}

export type { UserResponse }

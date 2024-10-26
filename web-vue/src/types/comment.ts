import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { UserResponse } from './user'

// export type Form = {
//   email: string
//   password: string
// }

// Pelo form iremos transferir para o back o titulo e o comentário. O id, githubUser(o usuario tem que estar logado) e createdAt serão gerados pelo back. Com isso vai ser salvo no banco de dados essas informações.
const commentSchema = z.object({
  title: z
    .string()
    .min(5, 'Informe o título do comentário')
    .max(20, 'Título muito longo'),
  content: z
    .string()
    .min(5, 'Informe o seu comentário')
    .max(200, 'Comentário muito longo'),
})

export const createCommentForm = toTypedSchema(commentSchema)

export type CommentFormRequest = z.infer<typeof commentSchema>

type Comment = {
  comment: {
    _id: string
    comment: {
      title: {
        title: string
      }
      content: {
        content: string
      }
      createdAt: string
      updatedAt?: string
    }
  }
  user: UserResponse
}

type CommentResponse = {
  data: {
    comments: Comment[]
    first: number
    items: number
    last: number
    next: number | null
    pages: number
    prev: number | null
    total:
      | number
      | {
          count: number
        }
  }
}

export type { CommentResponse, Comment }

import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { User } from './user'

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

export type CommentResponse = {
  _id: string
  user: User
  title: string
  content: string
  createdAt: string
  updatedAt?: string
}

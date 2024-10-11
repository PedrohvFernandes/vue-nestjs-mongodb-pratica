import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// export type Form = {
//   email: string
//   password: string
// }

// Pelo form iremos transferir para o back o nome, o titulo e o comentário. O id, githubUser(o usuario tem que estar logado) e createdAt serão gerados pelo back. Com isso vai ser salvo no banco de dados essas informações.
const commentSchema = z.object({
  username: z.string().min(2, 'Informe o seu nome').max(20, 'Nome muito longo'),
  title: z
    .string()
    .min(5, 'Informe o título do comentário')
    .max(20, 'Título muito longo'),
  comment: z
    .string()
    .min(5, 'Informe o seu comentário')
    .max(200, 'Comentário muito longo'),
})

export const createCommentForm = toTypedSchema(commentSchema)

export type CommentFormRequest = z.infer<typeof commentSchema>

export type CommentResponse = {
  id: string
  username: string
  githubUser: string
  title: string
  comment: string
  createdAt: string
  updatedAt?: string
}

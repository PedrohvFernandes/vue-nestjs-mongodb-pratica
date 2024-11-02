import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { UserResponse } from './user'

// export type Form = {
//   email: string
//   password: string
// }
/**
 * @comment
 *
 * ! Apenas para tipagem do request do form de comentário
 * ? O schema do zod para validar
 */
// Pelo form iremos transferir para o back o titulo e o comentário. O id, githubUser(o usuario tem que estar logado) e createdAt serão gerados pelo back. Com isso vai ser salvo no banco de dados essas informações.
const createCommentSchema = z.object({
  title: z
    .string()
    .min(5, 'Informe o título do comentário')
    .max(20, 'Título muito longo')
    .trim(),
  content: z
    .string()
    .min(1, 'Informe o seu comentário')
    .max(1000, 'Comentário muito longo')
    .trim(),
})

/**
 *
 *
 *! Apenas para tipagem do request do form de comentário, o schema do zod para validar
 * @createCommentFormToTyped
 */
const createCommentFormToTyped = toTypedSchema(createCommentSchema)

type CommentFormRequest = z.infer<typeof createCommentSchema>

type CommentFormRequestWithUser = CommentFormRequest & { userId: string }

/**
 *
 *
 * @Comment
 *
 * ! Apenas para tipagem do retorno do back quando retornamos um comentário
 */
type Comment = {
  data: {
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
      userId: string
    }
  }
}

/**
 *
 *
 * @CommentResponseGetAll
 *
 * ! Apenas para tipagem do retorno do back quando retornamos todos os comentários
 */
type CommentResponseGetAll = {
  comment: Comment['data']
  user: UserResponse
}

/**
 *
 *
 * @GetCommentsResponse
 *
 *
 */
type CommentResponse = {
  data: {
    comments: CommentResponseGetAll[]
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

/**
 * @getCommentsSchema
 */
type GetCommentsRequest = {
  page: number
  perPage: number
}

/**
 * @deleteCommentSchema
 */
type DeleteCommentRequest = {
  userId: string
  commentId: string
}

/**
 * @updateCommentSchema
 *
 * ! Apenas para tipagem do request do form de atualização de comentário
 */
const updateCommentSchema = z.object({
  title: z.string().trim().max(20, 'Título muito longo').optional().nullish(),
  content: z
    .string()
    .trim()
    .max(1000, 'Comentário muito longo')
    .optional()
    .nullish(),
})

const updateCommentSchemaToTyped = toTypedSchema(updateCommentSchema)

type UpdateCommentFormRequest = z.infer<typeof updateCommentSchema>

/**
 *
 * @UpdateCommentRequest
 * ! Apenas para tipagem do request de atualização de comentário, para passar pra url o id do usuário e o id do comentário
 */
type UpdateCommentRequest = {
  userId: string
  commentId: string
}

/**
 *
 *
 * @CommentFormUpdateRequestWithUserAndComment
 * ! Unificação dos tipos para atualização de comentário - Um do do form que pega o titulo e o comentário e outro do comentário que pega o id do usuário e o id do comentário que é pra request que temos que passar o id do usuário e o id do comentário na url. Juntamos tudo e colocamos no request
 */
type CommentFormUpdateRequestWithUserAndComment = UpdateCommentFormRequest &
  UpdateCommentRequest

export type {
  CommentResponse,
  Comment,
  CommentFormRequestWithUser,
  CommentFormRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
  UpdateCommentRequest,
  CommentFormUpdateRequestWithUserAndComment,
  UpdateCommentFormRequest,
  CommentResponseGetAll,
}

export {
  createCommentFormToTyped,
  createCommentSchema,
  updateCommentSchemaToTyped,
}

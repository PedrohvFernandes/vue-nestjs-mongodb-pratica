import { toast } from '@/components/ui/toast'
import { CommentResponse, GetCommentsRequest } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils/error-message'

export async function getComment({
  page,
  perPage,
}: GetCommentsRequest): Promise<CommentResponse> {
  try {
    // const { data } = await api.get<CommentResponseServerJson>(
    const { data } = await api.get<CommentResponse>(
      ConfigRoutes.comments.backend.comment.getComments({ page, perPage }),
    )

    return data
  } catch (error) {
    const er = errorMessage(error)

    toast({
      title: 'Erro ao carregar os comentários',
      description: er,
      variant: 'destructive',
    })

    throw error
  }
}

export const SIXTY_SECONDS_TIME_COMMENT = 1000 * 60 // 60 seconds // se colocar mais um * 5, // 5 minutos.

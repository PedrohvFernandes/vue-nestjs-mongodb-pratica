import { toast } from '@/components/ui/toast'
import { DeleteCommentRequest } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils'

export async function deleteComment({
  userId,
  commentId,
}: DeleteCommentRequest) {
  try {
    await api.delete(
      ConfigRoutes.comments.backend.comment.deleteComment({
        userId,
        commentId,
      }),
    )

    toast({
      title: 'Comentário deletado com sucesso',
      description: `Comentário deletado com sucesso!`,
      variant: 'success',
    })
  } catch (error) {
    const er = errorMessage(error)

    toast({
      title: 'Erro ao deletar comentário',
      description: er,
      variant: 'destructive',
    })
  }
}

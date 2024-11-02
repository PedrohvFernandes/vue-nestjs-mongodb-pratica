import { toast } from '@/components/ui/toast'
import { Comment, CommentFormUpdateRequestWithUserAndComment } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils/error-message'

export async function updateComment({
  userId,
  commentId,
  content,
  title,
}: CommentFormUpdateRequestWithUserAndComment) {
  try {
    const { data } = await api.put<Comment>(
      ConfigRoutes.comments.backend.comment.updateComment({
        userId,
        commentId,
      }),
      {
        content,
        title,
      },
    )

    toast({
      title: 'Comentário atualizado com sucesso',
      description: 'Seu comentário foi atualizado com sucesso',
      variant: 'success',
    })
    return data
  } catch (error) {
    const er = errorMessage(error)
    toast({
      title: 'Erro ao atualizar comentário',
      description: er,
      variant: 'destructive',
    })

    throw er
  }
}

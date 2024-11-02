import { toast } from '@/components/ui/toast'
import { CommentFormRequestWithUser } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils'

export async function createComment({
  content,
  title,
  userId,
}: CommentFormRequestWithUser) {
  try {
    await api.post(ConfigRoutes.comments.backend.comment.createComment(), {
      content,
      title,
      userId,
    })

    toast({
      title: `Comentário criado com sucesso: ${title}`,
      description: `Seu comentário com a descrição: ${content.split(' ').slice(0, 12).join(' ')}... foi enviado com sucesso!`,
      variant: 'success',
    })
  } catch (error) {
    const er = errorMessage(error)

    toast({
      title: 'Erro ao criar comentário',
      description: er,
      variant: 'destructive',
    })

    throw er
  }
}

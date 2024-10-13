import { toast } from '@/components/ui/toast'
import { CommentResponseServerJson } from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'

export async function getComment(
  page: number,
  perPage: number,
): Promise<CommentResponseServerJson> {
  try {
    const { data } = await api.get<CommentResponseServerJson>(
      ConfigRoutes.comments.backend.comments(page, perPage),
    )

    // await new Promise((resolve) => setTimeout(resolve, 200000))

    toast({
      title: 'Comentários carregados com sucesso',
      variant: 'success',
    })
    return data
  } catch (error) {
    toast({
      title: 'Erro ao carregar os comentários',
      variant: 'destructive',
    })
    return Promise.reject(
      new Error(error instanceof Error ? error.message : String(error)),
    )
  }
}

export const keyComment = 'comment'

export const staleTimeComment = 1000 * 60 // 60 seconds // se colocar mais um * 5, // 5 minutos.

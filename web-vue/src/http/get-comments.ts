import { toast } from '@/components/ui/toast'
import {
  CommentResponse,
  GetCommentsRequest,
  // CommentResponseServerJson
} from '../types'
import { api } from '@/lib'
import { ConfigRoutes } from '@/config'
import { errorMessage } from '@/utils'
import { ref, Ref } from 'vue'
import { RouteLocationNormalizedLoadedGeneric } from 'vue-router'

export async function getComments(
  { page, perPage }: GetCommentsRequest,
  // ): Promise<CommentResponseServerJson> {
): Promise<CommentResponse> {
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

export const commentQueryKey = {
  all: ['comments'],
  pagination: (page: Ref<number, number>) => [
    ...commentQueryKey.all,
    'pagination',
    page,
  ],
  comments: () => [...commentQueryKey.all, 'details'],
  comment: (id: string) => [...commentQueryKey.comments(), id],
  infinity: () => [...commentQueryKey.all, 'infinity'],
}

// Se a página mudar, atualizamos a query string. Se não vier nada, a página é 1. Se vier algo, convertemos para número, se vier 0 ou negativo, a página é 1, porque usamos o Math.max, ele pega o maior valor entre os dois
export const refPageComment = (route: RouteLocationNormalizedLoadedGeneric) => {
  return ref(
    route.query.page ? Math.max(1, parseInt(route.query.page as string)) : 1,
  )
}

export const SIXTY_SECONDS_TIME_COMMENTS = 1000 * 60 // 60 seconds // se colocar mais um * 5, // 5 minutos.

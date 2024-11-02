<script setup lang="ts">
import { CardComment, Pagination, SkeletonComment } from '@/components'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  getComments,
  commentQueryKey,
  refPageComment,
  SIXTY_SECONDS_TIME_COMMENTS,
} from '@/http'
import {
  CommentResponse,
  // CommentResponseServerJson,
} from '@/types'

const commentsSkeleton = Array.from({ length: 6 }) // Esqueleto dos comentários
const route = useRoute() // Rota atual
const refPage = refPageComment(route) // Página da rota atual
const refPerPage = ref(12) // Número de comentários por página

const { data: commentsResponse, isLoading } = useQuery<CommentResponse>({
  queryKey: commentQueryKey.pagination(refPage),
  queryFn: () =>
    getComments({ page: refPage.value, perPage: refPerPage.value }),
  staleTime: Infinity,
  placeholderData: keepPreviousData, // Mantém os dados antigos enquanto a nova requisição não é feita, se mudar algo na requisição, ele refaz
  retry: false,
  // Cache time https://tanstack.com/query/latest/docs/framework/vue/guides/caching
  gcTime: SIXTY_SECONDS_TIME_COMMENTS,
  refetchOnWindowFocus: false, // Evita que a query refaça quando a janela ganha foco
  // refetchOnMount: false, // Não refaz a query ao remontar o componente
  // refetchOnReconnect: false, // Evita refetch ao reconectar
})

// O watch é uma função que observa uma variável e executa uma função sempre que essa variável mudar. No caso, estamos observando a query string da rota
watch(
  // Se a página mudar, atualizamos a query string
  () => route.query.page,
  // A função que será executada sempre que a query string mudar. Esse newPage é o novo valor da query string
  (newPage) => {
    // Atualizamos o valor da página atual. Ao mudar, o useQuery irá refazer a requisição
    refPage.value = newPage ? Math.max(1, parseInt(newPage as string)) : 1
  },
)
</script>

<template>
  <h1 class="text-3xl font-bold text-center">Comentários</h1>

  <main class="flex-1 p-4 flex flex-col justify-between">
    <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-2">
      <template v-if="isLoading || !commentsResponse">
        <SkeletonComment v-for="(_, index) in commentsSkeleton" :key="index" />
      </template>

      <template v-if="commentsResponse">
        <CardComment
          v-for="comment in commentsResponse.data.comments"
          :comment="comment.comment"
          :user="comment.user"
          :_id="comment.comment._id"
          :key="comment.comment._id"
        />
      </template>

      <template v-if="commentsResponse?.data.comments.length === 0">
        <p class="text-center text-gray-500">Nenhum comentário cadastrado</p>
      </template>
    </div>
    <Pagination
      v-if="commentsResponse"
      :pages="commentsResponse.data.pages"
      :items="commentsResponse.data.items"
      :total="commentsResponse.data.total"
      :page="refPage"
      :per-page="refPerPage"
    />
  </main>
</template>

<script setup lang="ts">
import { CardComment, Pagination, SkeletonComment } from '@/components'
import { getComment, keyComment, staleTimeComment } from '@/http'
import {
  CommentResponse,
  // CommentResponseServerJson
} from '@/types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const commentsSkeleton = Array.from({ length: 6 })

const route = useRoute()

// Se não vier nada ou 0
const refPage = ref(
  // Se a query string page existir, pegamos o valor dela. Se não, a página é 1
  route.query.page
    ? parseInt(route.query.page as string) < 1
      ? 1 // Se vier 0
      : parseInt(route.query.page as string) // Se vier um número
    : 1, // Se não vier nada ou 0
)

const refPerPage = ref(12)

const { data: commentsResponse, isLoading } =
  // useQuery<CommentResponseServerJson>({
  useQuery<CommentResponse>({
    queryKey: [keyComment, refPage],
    queryFn: () => getComment(refPage.value, refPerPage.value),
    staleTime: staleTimeComment,
    placeholderData: keepPreviousData,
    // Cache time https://tanstack.com/query/latest/docs/framework/vue/guides/caching
    gcTime: staleTimeComment,
    refetchOnWindowFocus: false, // Evita que a query refaça quando a janela ganha foco
    refetchOnMount: false, // Não refaz a query ao remontar o componente
    refetchOnReconnect: false, // Evita refetch ao reconectar
  })

// O watch é uma função que observa uma variável e executa uma função sempre que essa variável mudar. No caso, estamos observando a query string da rota
watch(
  // Se a página mudar, atualizamos a query string
  () => route.query.page,
  // A função que será executada sempre que a query string mudar. Esse newPage é o novo valor da query string
  (newPage) => {
    // Atualizamos o valor da página atual. Ao mudar, o useQuery irá refazer a requisição
    refPage.value = newPage ? parseInt(newPage as string) : 1
  },
)
</script>

<!-- <script lang="ts">
export default {
  name: 'Comments',
  // outras opções do componente
}
</script> -->

<template>
  <h1 class="text-3xl font-bold text-center">Comentários</h1>

  <main class="flex-1 p-4 flex flex-col justify-between">
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
      <template v-if="isLoading || !commentsResponse">
        <SkeletonComment v-for="(_, index) in commentsSkeleton" :key="index" />
      </template>

      <template v-if="commentsResponse">
        <!-- v-for="(comment, index) in commentsResponse.data" -->
        <CardComment
          v-for="comment in commentsResponse.data.comments"
          :comment="comment.comment"
          :user="comment.user"
          :_id="comment.comment._id"
          :key="comment.comment._id"
        />
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

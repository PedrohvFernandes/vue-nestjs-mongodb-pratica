<!-- <script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :total="100"
    :sibling-count="1"
    class="text-primary"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Button
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template> -->

<script setup lang="ts">
import { computed, reactive } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-vue-next'
import { useRoute, useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { PaginationProps } from '@/types/pagination'

const { items, page, pages, perPage, total } = defineProps<PaginationProps>()
// const refPage = ref(page)
const refPagination = reactive<PaginationProps>({
  page: page,
  items: items,
  pages: pages,
  perPage: perPage,
  total: total,
})
const router = useRouter()
const route = useRoute()

// Cálculos para controle da paginação. O computed é uma função que retorna um valor. Sempre que uma das dependências mudar, o valor do computed é recalculado e atualizado na tela, em vez de fazer logicas no template
// const isFirstPage = computed(() => refPage.value <= 1)
// const isLastPage = computed(() => refPage.value >= pages)
const isFirstPage = computed(() => refPagination.page <= 1)
const isLastPage = computed(() => refPagination.page >= pages)

function updatePageParam(newPage: number) {
  // Pegamos o valor atual da query string e atualizamos o valor da chave `page` com o novo valor da página
  refPagination.page = newPage
  router.push({ query: { ...route.query, page: newPage.toString() } })
}

function firstPage() {
  updatePageParam(1)
}

function previousPage() {
  if (!isFirstPage.value) {
    updatePageParam(refPagination.page - 1)
  }
}

function nextPage() {
  if (!isLastPage.value) {
    updatePageParam(refPagination.page + 1)
  }
}

function lastPage() {
  updatePageParam(pages)
}

function pageLimit() {
  // router.replace(ConfigRoutes.comments.default.notFound.name)

  refPagination.page = pages
  router.push({ query: { ...route.query, page: pages.toString() } })
}

if (page > pages) {
  pageLimit()
}
</script>

<template>
  <div
    class="flex flex-col md:flex-row items-center justify-between gap-2 w-full text-muted-foreground"
  >
    <span class="text-sm md:text-lg"
      >Showing {{ refPagination.perPage }} of {{ total }} items</span
    >

    <div class="flex items-center gap-8">
      <span class="text-sm md:text-lg">
        Page {{ refPagination.page }} of {{ pages }}
      </span>

      <div class="space-x-1.5">
        <Button
          @click="firstPage"
          :disabled="isFirstPage"
          class="p-2"
          variant="secondary"
        >
          <ChevronsLeft class="size-4" />
          <span class="sr-only">First page</span>
        </Button>

        <Button
          @click="previousPage"
          :disabled="isFirstPage"
          class="p-2"
          variant="secondary"
        >
          <ChevronLeft class="size-4" />
          <span class="sr-only">Previous page</span>
        </Button>

        <Button
          @click="nextPage"
          :disabled="isLastPage"
          class="p-2"
          variant="secondary"
        >
          <ChevronRight class="size-4" />
          <span class="sr-only">Next page</span>
        </Button>

        <Button
          @click="lastPage"
          :disabled="isLastPage"
          class="p-2"
          variant="secondary"
        >
          <ChevronsRight class="size-4" />
          <span class="sr-only">Last page</span>
        </Button>
      </div>
    </div>
  </div>
</template>

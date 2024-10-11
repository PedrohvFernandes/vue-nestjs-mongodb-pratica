<script setup lang="ts">
// import { CommentResponse } from '@/types'

import { Ellipsis } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// const props = defineProps<{ comment: CommentResponse }>()
</script>

<template>
  <div class="max-w-2xl p-2">
    <article
      class="flex flex-col gap-4 p-6 mb-3 text-base bg-primary ring ring-primary-foreground/25 rounded"
    >
      <header class="flex justify-between items-center mb-2">
        <div class="flex flex-col">
          <p class="inline-flex items-center mr-3 text-sm font-semibold">
            Bonnie Green
          </p>
          <p class="italic text-sm text-muted-foreground">
            GitHub:Bonnie_sadsd
          </p>
        </div>
        <!-- Dropdown menu -->
        <DropdownMenu>
          <DropdownMenuTrigger
            class="bg-primary-foreground hover:bg-primary-foreground/80 transition-all rounded-full p-1"
            ><Ellipsis class="text-primary"
          /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Deletar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div class="flex flex-col gap-2">
        <h2
          class="font-bold uppercase tracking-wider underline underline-offset-4 decoration-4"
        >
          Titulo do comentário
        </h2>

        <p class="text-muted-foreground">O que a pessoa comentou</p>
      </div>
      <div
        class="flex flex-col md:flex-row items-center md:justify-end gap-2 text-center"
      >
        <p class="text-sm text-muted-foreground">
          <time pubdate datetime="2022-03-12" title="March 12th, 2022"
            ><span class="text-blue-500 font-bold underline decoration-2"
              >Criado:</span
            >
            Mar. 12, 2022</time
          >
        </p>
        <p class="text-sm text-muted-foreground">
          <time pubdate datetime="2022-03-12" title="March 12th, 2022"
            ><span class="text-blue-500 font-bold underline decoration-2"
              >Alterado:</span
            >
            : Mar. 12, 2022</time
          >
        </p>
      </div>
    </article>
  </div>
</template>

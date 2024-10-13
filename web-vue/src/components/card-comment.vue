<script setup lang="ts">
import { CommentResponse } from '@/types'

import { Ellipsis } from 'lucide-vue-next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { FormattedDate } from '.'

const { comment, createdAt, githubUser, title, updatedAt, username } =
  defineProps<CommentResponse>()
</script>

<template>
  <div class="max-w-2xl p-2">
    <article
      class="flex flex-col gap-4 p-6 text-base bg-primary ring ring-primary-foreground/25 rounded drop-shadow-lg"
    >
      <header class="flex justify-between items-center mb-2">
        <div class="flex flex-col">
          <p class="inline-flex items-center text-sm font-semibold">
            {{ username }}
          </p>
          <p class="italic text-sm text-muted-foreground">
            GitHub: {{ githubUser }}
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
      <div class="flex flex-col gap-2 break-words">
        <h2 class="font-bold uppercase tracking-wider">{{ title }}</h2>

        <p class="text-secondary">
          {{ comment }}
        </p>
      </div>
      <div
        class="flex flex-col md:flex-row justify-center md:justify-end gap-2 text-center"
      >
        <p class="text-sm text-muted-foreground">
          <span class="text-tertiary font-bold">Criado: </span>
          <FormattedDate :date="createdAt" />
        </p>
        <p v-if="updatedAt" class="text-sm text-muted-foreground">
          <span class="text-tertiary font-bold">Alterado: </span>
          <FormattedDate :date="updatedAt" />
        </p>
      </div>
    </article>
  </div>
</template>

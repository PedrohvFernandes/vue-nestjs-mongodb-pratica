<script setup lang="ts">
import { CommentResponseGetAll } from '@/types/comment'

import { FormattedDate } from '@/components'
import { CardMenuComment } from './menu'
import { cn } from '@/lib'
import { useAuth } from '@/contexts/use-auth'
import { toRefs, computed } from 'vue'

const { user: userLogged } = useAuth()
const props = defineProps<CommentResponseGetAll>()
const { comment, user } = toRefs(props)

// Passamos computed esse props para receber o valor atualizado
const userValue = computed(() => ({
  _id: user.value._id,
  username: user.value.user.username,
  githubUser: user.value.user.githubUser,
}))

const commentValue = computed(() => ({
  _id: comment.value._id,
  title: comment.value.comment.title.title,
  content: comment.value.comment.content.content,
  createdAt: comment.value.comment.createdAt,
  updatedAt: comment.value.comment.updatedAt,
  userId: comment.value.comment.userId,
}))
</script>

<template>
  <div class="w-full lg:max-w-2xl p-2">
    <article
      :class="
        cn(
          'flex flex-col gap-4 p-6 text-base bg-primary ring ring-primary-foreground/25 rounded drop-shadow-lg',
          {
            'ring-success/50': userLogged?.data.userId === commentValue.userId,
          },
        )
      "
    >
      <header class="flex justify-between items-center mb-2">
        <div class="flex flex-col">
          <p class="inline-flex items-center text-sm font-semibold">
            {{ userValue.username }}
          </p>
          <p class="italic text-sm text-muted-foreground">
            GitHub: {{ userValue.githubUser }}
          </p>
        </div>
        <!-- Dropdown menu -->
        <CardMenuComment
          :user-id="user._id"
          :comment-id="comment._id"
          v-if="user._id === userLogged?.data.userId"
        />

        <p v-else class="text-3xl">🙂‍↔️</p>
      </header>
      <div class="flex flex-col gap-2 break-all">
        <h2 class="text-sm sm:text-base font-bold uppercase tracking-wider">
          {{ commentValue.title }}
        </h2>

        <p
          class="h-24 max-h-24 text-secondary overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-primary-foreground [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-foreground"
        >
          {{ commentValue.content }}
        </p>
      </div>
      <div
        class="flex flex-col md:flex-row justify-center lg:justify-end gap-2 text-center"
      >
        <p class="text-xs text-muted-foreground">
          <span class="text-tertiary font-bold">Criado: </span>
          <FormattedDate :date="commentValue.createdAt" />
        </p>
        <p v-if="commentValue.updatedAt" class="text-xs text-muted-foreground">
          <span class="text-tertiary font-bold">Alterado: </span>
          <FormattedDate :date="commentValue.updatedAt" />
        </p>
      </div>
    </article>
  </div>
</template>

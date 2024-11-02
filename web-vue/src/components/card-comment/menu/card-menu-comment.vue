<script setup lang="ts">
import DialogDeleteComment from './dialogs/dialog-delete-comment.vue'
import DialogUpdateComment from './dialogs/dialog-update-comment.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Ellipsis } from 'lucide-vue-next'

interface CommentProps {
  userId: string
  commentId: string
}

defineProps<CommentProps>()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="bg-primary-foreground hover:bg-primary-foreground/80 transition-all rounded-full p-1"
      ><Ellipsis class="text-primary"
    /></DropdownMenuTrigger>
    <DropdownMenuContent class="flex flex-col gap-2 p-2">
      <DropdownMenuLabel>Opções</DropdownMenuLabel>
      <DropdownMenuSeparator class="bg-primary/50" />
      <DialogUpdateComment
        :comment-update="{
          commentId,
          userId,
        }"
      />
      <DialogDeleteComment
        :comment-delete="{
          commentId,
          userId,
        }"
      />
    </DropdownMenuContent>
  </DropdownMenu>
</template>

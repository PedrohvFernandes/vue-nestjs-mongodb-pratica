<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useAuth } from '@/contexts/use-auth'
import { deleteComment, commentQueryKey } from '@/http'
import { queryClient } from '@/lib/vue-query'
import { DeleteCommentRequest } from '@/types'
import { useMutation } from '@tanstack/vue-query'
import { LoaderCircle } from 'lucide-vue-next'

interface DeleteCommentProps {
  commentDelete: DeleteCommentRequest
}

defineProps<DeleteCommentProps>()

// const isLoading = ref(false)

const { user } = useAuth()

const mutation = useMutation({
  mutationFn: ({ commentId, userId }: DeleteCommentRequest) => {
    return deleteComment({
      commentId,
      userId,
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: commentQueryKey.all,
    })
  },
})

const handleDeleteComment = async ({
  commentId,
  userId,
}: DeleteCommentRequest) => {
  if (!user.value?.data.userId) return

  if (userId !== user.value.data.userId) return

  // isLoading.value = true

  // await deleteComment({
  //   commentId,
  //   userId,
  // })

  // isLoading.value = false

  // await queryClient.invalidateQueries({
  //   queryKey: [keyComment],
  // })
  mutation.mutate({ commentId, userId })
}
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button variant="destructive"> Delete </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[425px] bg-foreground ring-2 ring-primary-foreground/25"
    >
      <DialogHeader>
        <DialogTitle>Certeza? 🥲</DialogTitle>
        <DialogDescription>
          Você tem certeza que deseja deletar esse comentário? Essa ação é
          irreversível.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant="destructive"
          class="flex items-center justify-center"
          :onclick="() => handleDeleteComment(commentDelete)"
          :disabled="mutation.isPending.value"
        >
          <LoaderCircle
            class="w-6 h-6 animate-spin"
            v-if="mutation.isPending.value"
          />

          <span class="font-bold" v-else>Deletar ⚠️</span>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

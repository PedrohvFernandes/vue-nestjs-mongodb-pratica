<!-- eslint-disable @typescript-eslint/no-explicit-any -->
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

import { useForm } from 'vee-validate'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  updateCommentSchemaToTyped,
  UpdateCommentRequest,
  CommentResponse,
} from '@/types'
import { commentQueryKey, refPageComment, updateComment } from '@/http'
import { LoaderCircle } from 'lucide-vue-next'
import { useMutation } from '@tanstack/vue-query'
import { useAuth } from '@/contexts/use-auth'
import { queryClient } from '@/lib/vue-query'
import { useRoute } from 'vue-router'

interface UpdateCommentProps {
  commentUpdate: UpdateCommentRequest
}

const props = defineProps<UpdateCommentProps>()

const { handleSubmit, resetForm } = useForm({
  validationSchema: updateCommentSchemaToTyped,
})

const { user } = useAuth()

const route = useRoute()
const refPage = refPageComment(route)

const mutation = useMutation({
  mutationFn: updateComment,
  mutationKey: commentQueryKey.pagination(refPage),
  // onMutate: async (updatedData) => {
  //   await queryClient.cancelQueries({
  //     queryKey: commentQueryKey.pagination(refPage),
  //   })
  //   const previousData = queryClient.getQueryData(
  //     commentQueryKey.pagination(refPage),
  //   )

  //   // Atualiza os dados do cache localmente
  //   queryClient.setQueryData(
  //     commentQueryKey.pagination(refPage),
  //     (oldData: CommentResponse) => {
  //       return oldData?.data.comments.map((item) =>
  //         item.comment._id === updatedData.commentId
  //           ? { ...item, ...updatedData }
  //           : item,
  //       )
  //     },
  //   )

  //   return { previousData }
  // },
  // onSuccess: (data) => {
  //   // Atualiza a lista localmente com os dados atualizados
  //   queryClient.setQueryData(
  //     commentQueryKey.pagination(refPage),
  //     (oldData: CommentResponse | undefined) => {
  //       if (!oldData) return // Caso os dados não existam, nada é feito

  //       return {
  //         ...oldData,
  //         data: {
  //           ...oldData.data,
  //           comments: oldData.data.comments.map((item) => {
  //             if (item.comment._id === props.commentUpdate.commentId) {
  //               const newData = {
  //                 ...item,
  //                 comment: {
  //                   ...item.comment,
  //                   title: data.data.comment.title.title,
  //                   content: data.data.comment.content.content,
  //                 },
  //               }
  //               return newData
  //             }
  //             queryClient.invalidateQueries({
  //               queryKey: commentQueryKey.pagination(refPage),
  //             })
  //             resetForm()
  //             return item
  //           }),
  //         },
  //       }
  //     },
  //   )
  //   // onSuccess: () => {
  //   //   queryClient.invalidateQueries({
  //   //     queryKey: commentQueryKey.pagination(refPage),
  //   //   })
  //   //   resetForm()
  //   // },
  //   // onError: (error) => {
  //   //   console.log(error)
  //   // },
  // },
  // onSuccess: (updatedItem) => {
  //   // Atualiza o item específico no cache do React Query
  //   queryClient.setQueryData(
  //     commentQueryKey.pagination(refPage),
  //     (oldItems: CommentResponse) =>
  //       oldItems.data.comments.map((item) =>
  //         item.comment._id === updatedItem.data._id
  //           ? { ...item, comment: updatedItem.data }
  //           : item,
  //       ),
  //   )
  // },
  onSuccess: (updatedItem) => {
    queryClient.setQueryData(
      commentQueryKey.pagination(refPage),
      (oldData: CommentResponse | undefined) => {
        if (!oldData) return

        const updatedComments = oldData.data.comments.map((item) =>
          item.comment._id === updatedItem.data._id
            ? { ...item, comment: updatedItem.data }
            : item,
        )

        return {
          ...oldData,
          data: {
            ...oldData.data,
            comments: updatedComments,
          },
        }
      },
    )

    resetForm()
  },

  onError: (error) => {
    console.log(error)
  },
})

const handleUpdateComment = handleSubmit(async (values) => {
  if (!user.value?.data.userId) return

  if (props.commentUpdate.userId !== user.value.data.userId) return
  // try {
  //   await updateComment({
  //     title: values.title,
  //     content: values.content,
  //     userId: props.commentUpdate.userId,
  //     commentId: props.commentUpdate.commentId,
  //   })
  //   await queryClient.invalidateQueries({
  //     queryKey: [keyComment],
  //   })
  //   resetForm()
  // } catch (error) {
  //   console.log(error)
  // }

  mutation.mutate({
    title: values.title,
    content: values.content,
    userId: props.commentUpdate.userId,
    commentId: props.commentUpdate.commentId,
  })
})

// const handleUpdateComment = (event: Event) => {
//   event.preventDefault()

//   if (!user.value?.data.userId) return
//   if (props.commentUpdate.userId !== user.value.data.userId) return

//   const formData = new FormData(event.target as HTMLFormElement)
//   const values = {
//     title: formData.get('title') as string,
//     content: formData.get('content') as string,
//   }

//   mutation.mutate(values)
// }
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button> Update </Button>
    </DialogTrigger>
    <DialogContent
      class="sm:max-w-[425px] bg-foreground ring-2 ring-primary-foreground/25"
    >
      <DialogHeader>
        <DialogTitle>Editar 😁</DialogTitle>
        <DialogDescription>
          Você pode editar o seu comentário aqui.
        </DialogDescription>
      </DialogHeader>
      <form
        @submit.prevent="handleUpdateComment"
        class="w-full max-w-[600px] flex flex-col justify-center gap-2"
      >
        <FormField v-slot="{ componentField }" name="title">
          <FormItem>
            <FormLabel>Titulo</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Titulo do comentário"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="content">
          <FormItem>
            <FormLabel>Comentário</FormLabel>
            <FormControl>
              <Textarea
                type="text"
                placeholder="Seu comentário"
                v-bind="componentField"
                class="h-32 sizing"
              />
            </FormControl>
            <FormMessage />
            <FormDescription> No que você está pensando? 🙂‍↔️ </FormDescription>
          </FormItem>
        </FormField>

        <DialogFooter class="gap-2 flex-col">
          <Button
            type="submit"
            variant="secondary"
            class="flex items-center justify-center"
            :disabled="mutation.isPending.value"
          >
            <LoaderCircle
              class="w-6 h-6 animate-spin"
              v-if="mutation.isPending.value"
            />

            <span class="flex items-center justify-center gap-2" v-else
              >Enviar <span>✔️</span></span
            >
          </Button>
          <Button type="button" @click="resetForm"> Reset </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>

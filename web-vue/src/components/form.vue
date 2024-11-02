<!-- 
  Com a prop setup não precisamos passar o export default dentro do script para no index conseguir exportar o componente como default. E se fizer isso vai dar erro aqui no script

  setup -> composition API do vuejs
-->
<script setup lang="ts">
import { useForm } from 'vee-validate'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { CommentFormRequestWithUser, createCommentFormToTyped } from '@/types'
import { createComment, commentQueryKey } from '@/http'
import { useAuth } from '@/contexts/use-auth'

// Pra pegar a instancia inicial do queryClient, podemos fazer dessa duas maneiras: Ou usa useQueryClient ou importa o queryClient de lib que é a instancia que nós criamos para o vue-query, passando la no main.ts
// import { useQueryClient } from '@tanstack/vue-query'
// const queryClient = useQueryClient()

import { queryClient } from '@/lib/vue-query'
import { LoaderCircle } from 'lucide-vue-next'
import { useMutation } from '@tanstack/vue-query'
import { useRouter } from 'vue-router'
import { ConfigRoutes } from '@/config'

const { handleSubmit, resetForm } = useForm({
  validationSchema: createCommentFormToTyped,
})

const { user } = useAuth()

const route = useRouter()

const mutation = useMutation({
  mutationFn: ({ content, title, userId }: CommentFormRequestWithUser) => {
    return createComment({
      title,
      content,
      userId,
    })
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: commentQueryKey.all,
    })

    resetForm()

    route.push(ConfigRoutes.comments.comments.path)
  },

  onError: (error) => {
    console.error(error)
  },
})

const handleCreateComment = handleSubmit(async (values) => {
  // try {
  //   await createComment({
  //     title: values.title,
  //     content: values.content,
  //     userId: user.value?.data.userId as string,
  //   })

  //   await queryClient.invalidateQueries({
  //     queryKey: [keyComment],
  //   })

  //   resetForm()
  // } catch (error) {
  //   console.error(error)
  // }

  mutation.mutate({
    title: values.title,
    content: values.content,
    userId: user.value?.data.userId as string,
  })
})
</script>

<template>
  <!-- <div> -->
  <!-- 
      @click é um evento do vuejs, que é equivalente ao onClick do React. Nada mais é que o v-on:click do vuejs
      https://www.youtube.com/watch?v=rMoHmWZXySM
    -->

  <!-- 
      v-model é uma diretiva do vuejs que é equivalente ao value e onChange do React. Ele liga um input a uma propriedade reativa(valor que pode ser alterado em tempo real)
    -->

  <form
    @submit="handleCreateComment"
    class="w-full max-w-[600px] flex flex-col justify-center gap-2"
  >
    <!-- 
        v-slot é uma diretiva do vuejs que é equivalente ao children do React. Basicamente é um slot default, ele é usado para passar conteúdo para o componente
    -->
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Titulo</FormLabel>
        <FormControl>
          <!-- 
            v-bind é uma diretiva do vuejs que é equivalente ao spread operator do React
          -->
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
  </form>
</template>

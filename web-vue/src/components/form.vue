<!-- 
  Com a prop setup não precisamos passar o export default dentro do script para no index conseguir exportar o componente como default. E se fizer isso vai dar erro aqui no script

  setup -> composition API do vuejs
-->
<script setup lang="ts">
// import { Form } from '@/types'

// import { ref } from 'vue'
// import { Button } from '@/components/ui/button'

// Propriedade reativa, tipo um useState do React, alteração em tempo real. Pode trabalhar com objetos e tipos primitivos com ele, mas se quiser trabalhar com objetos pode usar o reactive
// const count = ref(0)
// const handleIncrement = () => {
//   // Temos que pegar o value do count para poder incrementar
//   count.value++
// }

// const forms = ref<Form>({
//   email: '',
//   password: '',
// })

// const handleFormSubmit = (form: Event) => {
//   form.preventDefault()
//   console.log({
//     email: forms.value.email,
//     password: forms.value.password,
//   })
// }

// Não é possivel colocar porque ja estamos usando o setup
// export default {
//   name: 'Teste',
// }
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
import { createCommentForm } from '@/types'
import { toast } from './ui/toast'

const { handleSubmit, resetForm } = useForm({
  validationSchema: createCommentForm,
})

const handleCreateComment = handleSubmit((values) => {
  console.log('Form submitted!', values)
  toast({
    title: `Comentário com o titulo ${values.title}`,
    description: 'Seu comentário foi enviado com sucesso!',
    variant: 'success',
  })
  resetForm()
})
</script>

<template>
  <!-- <div> -->
  <!-- 
      @click é um evento do vuejs, que é equivalente ao onClick do React. Nada mais é que o v-on:click do vuejs
      https://www.youtube.com/watch?v=rMoHmWZXySM
    -->
  <!-- <Button class="bg-red-500" @click="handleIncrement">Click</Button>
    <p>{{ count }}</p>
    <form class="flex flex-col gap-2" @submit="handleFormSubmit"> -->
  <!-- 
      v-model é uma diretiva do vuejs que é equivalente ao value e onChange do React. Ele liga um input a uma propriedade reativa(valor que pode ser alterado em tempo real)
    -->
  <!-- <input type="email" v-model="forms.email" class="text-zinc-800" />
      <input type="password" v-model="forms.password" class="text-zinc-800" />
      <Button @click="handleFormSubmit">Submit</Button>
    </form> -->
  <!-- </div> -->
  <form
    @submit="handleCreateComment"
    class="w-full max-w-[600px] flex flex-col justify-center gap-2"
  >
    <!-- 
        v-slot é uma diretiva do vuejs que é equivalente ao children do React. Basicamente é um slot default, ele é usado para passar conteúdo para o componente
    -->
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Nome</FormLabel>
        <FormControl>
          <!-- 
            v-bind é uma diretiva do vuejs que é equivalente ao spread operator do React
          -->
          <Input type="text" placeholder="Seu Nome" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
    <FormField v-slot="{ componentField }" name="comment">
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
    <Button type="submit" variant="secondary"> Submit </Button>
  </form>
</template>

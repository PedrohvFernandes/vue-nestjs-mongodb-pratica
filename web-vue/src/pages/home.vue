<!-- 
  Com a prop setup não precisamos passar o export default dentro do script para no index conseguir exportar o componente como default. E se fizer isso vai dar erro aqui no script
-->
<script setup lang="ts">
import { Form } from '@/types'

import { ref } from 'vue'
import { Button } from '@/components/ui/button'

// Propriedade reativa, tipo um useState do React
const count = ref(0)
const handleIncrement = () => {
  // Temos que pegar o value do count para poder incrementar
  count.value++
}

const forms = ref<Form>({
  email: '',
  password: '',
})

const handleFormSubmit = (form: Event) => {
  form.preventDefault()
  console.log({
    email: forms.value.email,
    password: forms.value.password,
  })
}

// Não é possivel colocar porque ja estamos usando o setup
// export default {
//   name: 'Teste',
// }
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <!-- 
      @click é um evento do vuejs, que é equivalente ao onClick do React. Nada mais é que o v-on:click do vuejs
      https://www.youtube.com/watch?v=rMoHmWZXySM
    -->
    <Button class="bg-red-500" @click="handleIncrement">Click</Button>
    <p>{{ count }}</p>
    <form class="flex flex-col gap-2" @submit="handleFormSubmit">
      <!-- 
      v-model é uma diretiva do vuejs que é equivalente ao value e onChange do React
    -->
      <input type="email" v-model="forms.email" class="text-zinc-800" />
      <input type="password" v-model="forms.password" class="text-zinc-800" />
      <Button @click="handleFormSubmit">Submit</Button>
    </form>
  </div>
</template>

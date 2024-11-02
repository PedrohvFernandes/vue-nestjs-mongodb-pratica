<!-- 
  Aqui fazemos os scripts para o vuejs. Podemos importar variáveis, objetos, componentes, criar variaveis, tipos, etc. Typar o componente...
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Toaster } from '@/components/ui/toast'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
// import { DefaultLayout } from './layouts'
</script>

<!-- 
  Aqui é tipo o react JSX/TSX do React para o vue, um html com js
-->
<template>
  <Toaster />
  <!-- A logica hoje funciona assim: Esse RouteView pega o que vem a partir da rota em routes.ts de acordo com a sequencia de filhos
   App
    - RouterView
    - PrivateRoute
      - RouteView
      - DefaultLayoutLogged
        - RouteView
        - Home
        - Comments
  -->
  <RouterView />
  <VueQueryDevtools />
</template>

<!-- <style scoped>
</style> -->

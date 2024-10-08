<!-- 
  Aqui fazemos os scripts para o vuejs. Podemos importar variáveis, objetos, componentes, criar variaveis, tipos, etc. Typar o componente...
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
// import { DefaultLayout } from './layouts'
</script>

<!-- 
  Aqui é tipo o react JSX/TSX do React para o vue, um html com js
-->
<template>
  <!-- A logica hoje funciona assim: Esse RouteView pega o que vem a partir da rota / ou seja o DefaultLayout. E dentro do DefaultLayout tem outro RouteView que pega o que vem como rota filho, ex: /comments -->
  <RouterView />
</template>

<!-- <style scoped>
</style> -->

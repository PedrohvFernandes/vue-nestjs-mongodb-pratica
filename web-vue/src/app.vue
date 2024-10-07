<!-- 
  Aqui fazemos os scripts para o vuejs. Podemos importar variáveis, objetos, componentes, criar variaveis, tipos, etc. Typar o componente...

  Lembrando que o import do vue para componentes vue ele não fica entre {} igual o react, mas você declara um nome dinamico aqui
-->
<script setup lang="ts">
import HelloWorld from './components/hello-world.vue'
</script>

<!-- 
  Aqui é tipo o react JSX/TSX do React para o vue, um html com js
-->
<template>
  <div>
    <HelloWorld />
  </div>
</template>

<!-- <style scoped>
</style> -->

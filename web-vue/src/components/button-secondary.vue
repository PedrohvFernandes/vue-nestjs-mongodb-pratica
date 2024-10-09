<!--
  Podemos ter varios scripts no mesmo componente, mas somente um com a tag setup. Não é preciso da tag script para conseguir exportar o componente do vue
-->
<script setup lang="ts">
import { Button } from './ui/button'
</script>

<template>
  <Button variant="secondary">
    <!-- 
      Ele recebe o conteudo que está dentro do componente e coloca no lugar do slot
    -->
    <slot />
  </Button>
</template>

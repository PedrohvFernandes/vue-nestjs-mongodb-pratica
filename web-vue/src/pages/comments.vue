<script setup lang="ts">
import { CardComment } from '@/components'
</script>

<!-- <script lang="ts">
export default {
  name: 'Comments',
  // outras opções do componente
}
</script> -->

<template>
  <main class="flex-1 p-4 grid sm:grid-cols-2 gap-2">
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
    <CardComment />
  </main>
</template>

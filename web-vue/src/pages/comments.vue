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
  <main class="p-4 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
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

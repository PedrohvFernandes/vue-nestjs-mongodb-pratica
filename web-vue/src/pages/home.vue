<script setup lang="ts">
import { Form } from '@/components'
</script>

<template>
  <main class="flex-1 p-4 flex flex-col items-center justify-center gap-4">
    <Form />
    <div class="text-center flex flex-col items-center">
      <h1
        class="text-4xl font-extrabold leading-none tracking-tight md:text-5xl lg:text-6xl"
      >
        No que você está
        <span
          class="text-blue-500 animate-pulse underline underline-offset-3 decoration-4 md:decoration-8 decoration-blue-400"
          >pensando?</span
        >
        🙂‍↔️
      </h1>

      <p class="text-lg font-normal lg:text-xl text-muted-foreground">
        Compartilhe suas ideias com o mundo!
      </p>
    </div>
  </main>
</template>

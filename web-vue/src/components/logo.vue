<script setup lang="ts">
import { IconCommentComponent } from '@/assets/icons'
import { Slash } from 'lucide-vue-next'
</script>

<template>
  <div class="flex items-center gap-2">
    <IconCommentComponent />
    <Slash class="text-primary-foreground/25 size-5 sm:size-6 md:size-7" />
    <h1
      class="text-sm sm:text-xl md:text-2xl font-bold uppercase tracking-widest"
    >
      Comments
    </h1>
  </div>
</template>

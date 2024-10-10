<script setup lang="ts">
import { IconCommentComponent } from '@/assets/icons'
import { Slash } from 'lucide-vue-next'
import { Itens, Menu } from './menu-itens'
</script>

<template>
  <header
    class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 ring-1 ring-primary-foreground/25 shadow-lg drop-shadow-lg"
  >
    <div className="container flex items-center justify-between gap-2">
      <div class="flex items-center gap-2">
        <IconCommentComponent />
        <Slash class="text-primary-foreground/25 size-5 sm:size-6 md:size-7" />
        <h1
          class="text-sm sm:text-xl md:text-2xl font-bold uppercase tracking-widest"
        >
          Comments
        </h1>
      </div>
      <nav>
        <Itens class="hidden md:flex" />
        <Menu />
      </nav>
    </div>
  </header>
</template>

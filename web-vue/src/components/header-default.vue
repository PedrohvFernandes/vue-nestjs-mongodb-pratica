<script setup lang="ts">
import { IconCommentComponent } from '@/assets/icons'
import { Slash } from 'lucide-vue-next'
import { Itens, Menu } from './menu'
import { DarkModeSwitch } from '.'
</script>

<template>
  <!-- 
   class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 ring-1 ring-primary-foreground/25 shadow-lg drop-shadow-lg"
  -->
  <header
    class="w-full fixed top-0 z-10 p-4 backdrop-blur-sm bg-primary/30 shadow-lg drop-shadow-lg"
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
      <nav class="flex items-center justify-center gap-2">
        <Itens class="hidden lg:flex" />
        <Menu />
        <DarkModeSwitch class="hidden lg:flex" />
      </nav>
    </div>
    <!-- 
      O que da o brilho no meio é o bg-gradient-to-r e via-primary-foreground que tem a cor diferente do bg-primary/5 e to-primary/5.  O to e bg tem que ter a mesma cor do bg do header, para dar o efeito de escuro no inicio e no final do header, e no meio o brilho, ou seja, uma cor mais forte, no via. Formando então um degradê(gradiente) de cores.
    -->
    <div
      class="fixed bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/5 to-primary/5 via-primary-foreground"
    ></div>
  </header>
</template>

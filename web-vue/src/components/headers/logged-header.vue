<script setup lang="ts">
import { Itens, Menu } from '@/components/menu'
import { DarkModeSwitch } from '@/components'
import { DefaultHeader } from '.'
</script>

<template>
  <DefaultHeader>
    <nav class="flex items-center justify-center gap-2">
      <Itens class="hidden lg:flex" />
      <Menu />
      <DarkModeSwitch class="hidden lg:flex" />
    </nav>
    <p class="text-xs sm:text-sm md:text-md lg:text-lg">
      Olá <span class="font-bold">Usuário</span>!
    </p>
  </DefaultHeader>
</template>

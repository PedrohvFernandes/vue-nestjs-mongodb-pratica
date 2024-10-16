<script setup lang="ts">
import { DefaultHeader } from '.'
import { Menu, ItensLogged } from '@/components/menu'
</script>

<template>
  <DefaultHeader>
    <nav class="flex items-center justify-center gap-2">
      <ItensLogged class="hidden lg:flex" />
      <Menu>
        <ItensLogged />
      </Menu>
    </nav>
    <p class="text-xs sm:text-sm md:text-md lg:text-lg">
      Olá <span class="font-bold">Usuário</span>!
    </p>
  </DefaultHeader>
</template>

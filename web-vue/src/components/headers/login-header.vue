<script setup lang="ts">
import { DefaultHeader } from '.'
import { ItensLogin, Menu } from '../menu'
</script>

<template>
  <DefaultHeader>
    <nav class="flex items-center justify-center gap-2">
      <ItensLogin class="hidden lg:flex" />
      <Menu>
        <ItensLogin />
      </Menu>
    </nav>
  </DefaultHeader>
</template>

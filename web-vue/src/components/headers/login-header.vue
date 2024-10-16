<script setup lang="ts">
import { DefaultHeader } from '.'
import { ItensLogin, Menu } from '../menu'
</script>

<template>
  <DefaultHeader>
    <template #itens-menu>
      <ItensLogin class="hidden lg:flex" />
      <Menu>
        <ItensLogin />
      </Menu>
    </template>
  </DefaultHeader>
</template>

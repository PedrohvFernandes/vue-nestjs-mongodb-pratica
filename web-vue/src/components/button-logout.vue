<script setup lang="ts">
import { DoorOpen, DoorClosed } from 'lucide-vue-next'
import { ref } from 'vue'
import Button from './ui/button/Button.vue'

interface Props {
  logout: () => void
}

defineProps<Props>()

const isHovered = ref(false)
</script>

<template>
  <Button
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    @click="logout"
    class="p-2 transition-transform duration-200 ease-in-out transform hover:scale-110"
  >
    <!-- Ícones mudando com base no estado de hover -->
    <component
      :is="isHovered ? DoorOpen : DoorClosed"
      class="hidden sm:block"
      :size="24"
    />
    <!-- Ícone DoorOpen para telas menores -->
    <DoorOpen class="block sm:hidden" :size="24" />
  </Button>
</template>

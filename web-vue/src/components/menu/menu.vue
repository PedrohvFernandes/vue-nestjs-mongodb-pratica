<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DialogClose } from 'radix-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { Badge } from '../ui/badge'
import { DarkModeSwitch } from '..'
import { AlignJustify } from 'lucide-vue-next'

// Ref para controlar a abertura do modal
const isOpen = ref(false)

// Função para alternar o estado do menu com comando de teclado
function toggleMenuCommand() {
  isOpen.value = !isOpen.value
}

// Listener para detectar Ctrl + K
function handleKeydown(event: KeyboardEvent) {
  if (window.innerWidth < 1024 && event.ctrlKey && event.key === 'k') {
    event.preventDefault()
    toggleMenuCommand()
  }
}

// Montar e desmontar o listener de teclado
// Sempre que fazer uma req é sempre bom colocar dentro do onMounted
onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

// Para desmontar o listener de teclado, evitar memory leak
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Sheet v-model:open="isOpen">
    <SheetTrigger as-child class="flex lg:hidden">
      <Button class="flex-1 flex items-center gap-2">
        <p class="hidden sm:flex">Open Menu</p>
        <p><AlignJustify class="sm:hidden" /></p>
        <Badge
          class="bg-foreground ring-1 ring-primary-foreground/25 hidden sm:flex lg:hidden"
        >
          Ctrl K
        </Badge>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <div class="flex flex-col justify-between gap-6 h-full">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription> Application Options </SheetDescription>
        </SheetHeader>
        <DialogClose>
          <slot />
        </DialogClose>
        <div class="flex flex-col justify-center text-center">
          <SheetDescription> Switch theme </SheetDescription>
          <DarkModeSwitch />
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>

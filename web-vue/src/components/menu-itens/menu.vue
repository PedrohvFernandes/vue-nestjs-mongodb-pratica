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
import { Itens } from '.'
import { DialogClose } from 'radix-vue'
import { onMounted, onUnmounted, ref } from 'vue'
import { Badge } from '../ui/badge'

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
      <Button class="flex items-center gap-2">
        Open Menu
        <Badge class="bg-foreground hidden sm:flex lg:hidden"> Ctrl K </Badge>
      </Button>
    </SheetTrigger>
    <SheetContent>
      <div class="flex flex-col justify-between gap-6 h-full">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription> Application Options </SheetDescription>
        </SheetHeader>
        <DialogClose>
          <Itens />
        </DialogClose>
      </div>
    </SheetContent>
  </Sheet>
</template>

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
</script>

<template>
  <Sheet>
    <SheetTrigger as-child class="flex items-center md:hidden">
      <Button> Open Menu </Button>
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

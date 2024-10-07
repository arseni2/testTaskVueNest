<template>
  <dialog :open="isOpen" @close="handleClose" class="border-none p-4 rounded-lg shadow-lg min-w-[450px] z-50" ref="modal">
    <form method="dialog" @mousedown.stop>
      <h3 class="text-lg font-semibold mb-6 text-center">{{ title }}</h3>
      <slot></slot>
    </form>
  </dialog>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps<{
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  title: string;
}>();

const modal = ref<HTMLDialogElement | null>(null);

const handleClose = () => {
  props.setIsOpen(false);
};


const handleClickOutside = (event: MouseEvent) => {
  if (modal.value && !modal.value.contains(event.target as Node)) {
    handleClose();
  }
};

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>


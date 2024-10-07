<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import CloseIcon from "../icons/CloseIcon.vue";


const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const props = defineProps<{
  name: string;
  color: string;
}>();

const emit = defineEmits<{
  (e: 'remove'): void;
}>();

const handleRemove = () => {
  emit('remove');
};
</script>

<template>
  <li :style="{ backgroundColor: hexToRgba(props.color, 0.4) }" class="rounded-lg w-fit flex gap-2 p-2 items-center">
    <div class="flex cursor-pointer" @click="handleRemove">
      <CloseIcon />
    </div>
    <div class="flex flex-col">
      <p :style="{ color: props.color }" class="text-sm font-medium">{{ props.name }}</p>
    </div>
  </li>
</template>
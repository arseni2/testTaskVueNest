<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

function handleInput(event: Event) {
  const input = event.target as HTMLInputElement;
  emit('update:modelValue', input.value);
}
</script>

<template>
  <input
      :type="props.type"
      :value="props.modelValue"
  @input="handleInput"
  class="outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
  :placeholder="props.placeholder"
  :required="props.required"
  />
</template>

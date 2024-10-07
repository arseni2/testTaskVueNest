<template>
  <div v-if="errors.length > 0" class="mt-4">
    <h2 class="text-red-600 font-semibold">Ошибки:</h2>
    <ul class="list-disc list-inside text-red-600">
      <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  errors: string[];
}>();
</script>

<style scoped>
/* Добавьте стили, если необходимо */
</style>

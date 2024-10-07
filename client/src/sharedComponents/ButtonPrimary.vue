<script setup lang="ts">
import {defineProps} from 'vue';
import SpinnerIcon from "../icons/SpinnerIcon.vue";

const props = defineProps<{
  isDisabled?: boolean;
  isLoading?: boolean;
}>();
</script>

<template>
  <button
      :class="{
      'text-white bg-[#4C8BF7] hover:bg-blue-500': !props.isDisabled && !props.isLoading,
      'text-black bg-white border-gray-300 border-[1px] rounded-[4px] shadow-sm cursor-not-allowed': props.isDisabled,
      'cursor-wait bg-[#4C8BF7] text-white': props.isLoading
    }"
    :disabled="props.isDisabled || props.isLoading"
    class="font-medium rounded-lg text-sm px-4 py-2.5"
  >
    <SpinnerIcon v-if="props.isLoading" />

    <slot/>
  </button>
</template>


<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import CloseIcon from "../icons/CloseIcon.vue";
import {ICreateCustomFieldValue, ICreateCustomFieldValueDeal} from "../types.ts";

const {customFields} = defineProps<{
  customFields: ICreateCustomFieldValue[] & ICreateCustomFieldValueDeal[];
}>();

const emit = defineEmits<{
  (e: 'removeField', index: number): void;
}>();

const handleRemove = (index: number) => {
  emit('removeField', index);
};
</script>

<template>
  <div v-if="customFields.length > 0" class="mt-4">
    <ul class="flex gap-2">
      <li v-for="(field, index) in customFields" :key="index" class="bg-gray-100 rounded-lg w-fit flex gap-2 p-2">
        <div class="flex mt-1 cursor-pointer" @click="handleRemove(index)">
          <CloseIcon />
        </div>
        <div>
          <h6 class="font-medium">{{ field?.field_id || field?.field_code }}</h6>
          <p class="text-sm">{{ field.value }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
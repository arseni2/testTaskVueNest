<script setup lang="ts">
import { ref, computed } from 'vue';
import ResultTable from "../components/ResultTable.vue";
import Dropdown from "../sharedComponents/Dropdown.vue";
import CreateContactForm from "../forms/CreateContactForm.vue";
import CreateCompanyForm from "../forms/CreateCompanyForm.vue";
import CreateDealForm from "../forms/CreateDealForm.vue";

const selectedEntity = ref('');
const entities = ref([
  { label: 'Не выбрано', component: null, isSelected: true },
  { label: 'Контакт', component: CreateContactForm },
  { label: 'Компания', component: CreateCompanyForm },
  { label: 'Сделка', component: CreateDealForm },
]);

const selectedComponent = computed(() => {
  const selected = entities.value.find(entity => entity.label === selectedEntity.value);
  return selected?.component || null;
});
</script>

<template>
  <div class="p-2">
    <Dropdown
        title="Не выбрано"
        v-model="selectedEntity"
        :items="entities"
    />
    <div class="flex flex-col gap-2 items-center">
      <component :is="selectedComponent" />
      <ResultTable :selected="selectedEntity" />
    </div>
  </div>
</template>
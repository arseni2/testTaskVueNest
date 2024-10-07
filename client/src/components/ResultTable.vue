<script setup lang="ts">
import { computed } from 'vue';
import { useCompanyStore } from "../store/CompanyStore.ts";
import { useContactStore } from "../store/ContactStore.ts";
import { useDealStore } from "../store/DealStore.ts";

const companyStore = useCompanyStore();
const contactStore = useContactStore();
const dealStore = useDealStore();

const companies = computed(() => companyStore.companies);
const contacts = computed(() => contactStore.contacts);
const deals = computed(() => dealStore.deals);


const allData = computed(() => {
  const combined = [];

  companies.value.forEach(company => {
    combined.push({ type: 'Компания', id: company.id, name: company.name || 'N/A' });
  });

  contacts.value.forEach(contact => {
    combined.push({ type: 'Контакт', id: contact.id, name: contact.name || 'N/A' });
  });

  deals.value.forEach(deal => {
    combined.push({ type: 'Сделка', id: deal.id, name: deal.name || 'N/A' });
  });

  return combined;
});
</script>

<template>
  <h1 class="text-center text-lg font-semibold mb-2 max-w-[700px] mt-4">Результаты</h1>

  <template v-if="allData.length === 0">
    <p class="text-center text-gray-500">Нет доступных данных.</p>
  </template>
  <template v-else>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[700px]">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Тип</th>
          <th scope="col" class="px-6 py-3">Id</th>
          <th scope="col" class="px-6 py-3">Имя</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in allData" :key="item.id" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.type }}</td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.id }}</td>
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ item.name }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </template>
</template>
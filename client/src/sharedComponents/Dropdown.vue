<script setup lang="ts">
import {ref, defineEmits, watch, onBeforeUnmount, DefineComponent} from 'vue';

const props = defineProps<{
  title: string;
  items: Array<{ label: string; component: DefineComponent | null; isSelected?: boolean }>;
  modelValue: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'change', value: string): void;
}>();

const isOpen = ref(false);

const defaultItem = props.items.find(item => item.isSelected) || null;

const selectedItem = ref(props.modelValue || defaultItem?.label || null);

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const closeDropdown = () => {
  isOpen.value = false;
};

watch(selectedItem, (newValue) => {
  emit('update:modelValue', newValue);
  emit('change', newValue);
});

watch(() => props.modelValue, (newValue) => {
  selectedItem.value = newValue || defaultItem?.label || null;
});

const handleItemClick = (itemLabel: string) => {
  selectedItem.value = itemLabel;
  closeDropdown();
};

const handleClickOutside = (event: MouseEvent) => {
  const dropdown = document.getElementById('dropdown');
  if (dropdown && !dropdown.contains(event.target as HTMLElement)) {
    closeDropdown();
  }
};

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('click', handleClickOutside);
  } else {
    document.removeEventListener('click', handleClickOutside);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div id="dropdown" class="relative">
    <button
        @click.prevent="toggleDropdown"
        id="dropdownDefaultButton"
        class="inline-flex justify-between w-fit items-center rounded-md border-[1px] border-gray-400 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        type="button"
    >
      {{ selectedItem || props.title }}
      <svg class="w-2.5 h-2.5 ms-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
      </svg>
    </button>

    <div
        v-if="isOpen"
        class="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-52 mt-1"
    >
      <ul class="py-2 text-sm text-gray-700">
        <li v-for="item in props.items" :key="item.component">
          <a
              href="#"
              @click.prevent="handleItemClick(item.label)"
              class="flex items-center block px-4 py-2 hover:bg-gray-100"
              :class="
              {'bg-gray-100': selectedItem === item.label}
              "
          >
            <svg
                v-if="selectedItem === item.label"
                class="w-4 h-4 text-black mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <span class="flex-grow" :class="{'pl-[22px]': selectedItem !== item.label}">
              {{ item.label }}
            </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, defineProps} from 'vue';
import Label from "../sharedComponents/Label.vue";
import Input from "../sharedComponents/Input.vue";
import {ICreateTag} from "../types.ts";
import ButtonSecondary from "../sharedComponents/ButtonSecondary.vue";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";
import InputColorPicker from "../sharedComponents/InputColorPicker.vue";

const props = defineProps<{
  onSubmit: (data: ICreateTag) => void;
  onCancel: () => void;
}>();

const name = ref('');
const color = ref('#000000');

const handleSubmit = () => {
  const data: ICreateTag = {
    color: color.value,
    name: name.value,
  };
  props.onSubmit(data);
  name.value = ""
  color.value = ""
};


const handleCancel = () => {
  props.onCancel();
};
</script>

<template>
  <div>
    <Label>Имя тега</Label>
    <Input v-model="name" :required="true" placeholder="Имя тега"/>

    <div class="mt-4">
      <Label>Цвет тега</Label>
      <InputColorPicker type="color" v-model="color" placeholder="Цвет поля"/>
    </div>

    <div class="flex justify-between mt-8">
      <ButtonSecondary type="button" @click="handleCancel">
        Отменить
      </ButtonSecondary>
      <ButtonPrimary type="button" @click="handleSubmit">
        Подтвердить
      </ButtonPrimary>
    </div>
  </div>
</template>

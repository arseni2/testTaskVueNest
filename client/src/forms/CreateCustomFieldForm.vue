<script setup lang="ts">
import {ref, defineProps} from 'vue';
import Label from "../sharedComponents/Label.vue";
import Input from "../sharedComponents/Input.vue";
import {ICreateCustomFieldValue} from "../types.ts";
import ButtonSecondary from "../sharedComponents/ButtonSecondary.vue";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";

const props = defineProps<{
  onSubmit: (data: ICreateCustomFieldValue) => void;
  onCancel: () => void;
}>();

const fieldName = ref('');
const fieldValue = ref('');

const handleSubmit = () => {
  const data: ICreateCustomFieldValue = {
    value: fieldValue.value,
    field_code: fieldName.value,
  };
  props.onSubmit(data);
  fieldName.value = ""
  fieldValue.value = ""
};


const handleCancel = () => {
  props.onCancel();
};
</script>

<template>
  <div>
    <Label>Имя поля</Label>
    <Input v-model="fieldName" :required="true" placeholder="Имя поля"/>

    <div class="mt-4">
      <Label>Значение поля</Label>
      <Input v-model="fieldValue" placeholder="Значение поля"/>
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

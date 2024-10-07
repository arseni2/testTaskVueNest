<script setup lang="ts">
import {ref, watch} from 'vue';
import Label from "../sharedComponents/Label.vue";
import Input from "../sharedComponents/Input.vue";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import Tag from "../components/Tag.vue";
import CustomField from "../components/CustomField.vue";
import Modal from "../components/Modal.vue";
import {ErrorResponse, ICreateCustomFieldValue, ICreateCustomFieldValueDeal, ICreateTag, IDealCreate} from "../types.ts";
import CreateCustomFieldForm from "./CreateCustomFieldForm.vue";
import CreateTagForm from "./CreateTagForm.vue";
import {CreateDeal, ICreateDealResponse} from "../api/deal.ts";
import {useDealStore} from "../store/DealStore.ts";
import ErrorList from "../components/ErrorList.vue";

const customFields = ref<ICreateCustomFieldValueDeal[]>([]);
const tags = ref<ICreateTag[]>([]);

const isCustomFieldModalOpen = ref(false);
const isTagModalOpen = ref(false);
const isDisableBtn = ref(true);
const isLoading = ref(false);

const dealTitle = ref(''); // Название сделки
const dealBudget = ref(''); // Бюджет сделки
const dealStatusId = ref('70570810'); // ID статуса
const dealPipelineId = ref('8713510'); // ID воронки
const dealResponsibleUserId = ref('11491022'); // ID пользователя, ответственного за компанию

const dealStore = useDealStore()

const errors = ref<string[]>([]);

const removeCustomField = (index: number) => {
  customFields.value.splice(index, 1);
};

watch([dealTitle, dealResponsibleUserId], (newValues) => {
  isDisableBtn.value = newValues.some(value => value.trim() === '');
});

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};

const handleClose = () => {
  isCustomFieldModalOpen.value = false;
  isTagModalOpen.value = false;
};

const onSubmitCustomFields = (data: ICreateCustomFieldValue & ICreateCustomFieldValueDeal) => {
  data.field_id = Number(data.field_code)
  delete data.field_code
  customFields.value.push(data);
  isCustomFieldModalOpen.value = false;
};

const onSubmitTagForm = (data: ICreateTag) => {
  tags.value.push(data);
  isTagModalOpen.value = false;
};

const handleSubmit = () => {
  isLoading.value = true
  const formData: IDealCreate = {
    name: dealTitle.value,
    price: +dealBudget.value,
    status_id: +dealStatusId.value,
    pipeline_id: +dealPipelineId.value,
    responsible_user_id: +dealResponsibleUserId.value,
    custom_fields_values: customFields.value,
    tags_to_add: tags.value,
  };
  CreateDeal(formData).then((data: ICreateDealResponse) => {
    errors.value = []
    dealStore.addDeal(data);
  }).catch((e: ErrorResponse) => {
    e.validationErrors.forEach(item => {
      if(!errors.value.includes(item.detail + item.path)) {
        errors.value.push(item.detail + item.path)
      }
    })
  }).finally(() => {
    isLoading.value = false
  })
};
</script>

<template>
  <div class="max-w-[600px] flex flex-col gap-4 p-2">
    <h1 class="text-center text-lg font-semibold mb-2">Форма создания сделки</h1>

    <div>
      <Label>Название сделки</Label>
      <Input v-model="dealTitle" placeholder="Название сделки"/>
    </div>

    <div>
      <Label>Бюджет сделки</Label>
      <Input type="number" v-model="dealBudget" placeholder="Бюджет сделки"/>
    </div>

    <div>
      <Label>ID статуса</Label>
      <Input type="number" v-model="dealStatusId" placeholder="ID статуса"/>
    </div>

    <div>
      <Label>ID воронки</Label>
      <Input type="number" v-model="dealPipelineId" placeholder="ID воронки"/>
    </div>

    <div>
      <Label>ID пользователя, ответственного за компанию</Label>
      <Input type="number" v-model="dealResponsibleUserId" placeholder="ID пользователя, ответственного за компанию"/>
    </div>

    <div>
      <Label>Кастомные поля</Label>
      <ButtonPrimary @click="isCustomFieldModalOpen = true">
        <PlusIcon/>
      </ButtonPrimary>
      <p class="text-xs text-gray-400">такое название поля сработало = 663215</p>
      <CustomField :customFields="customFields" @removeField="removeCustomField"/>
    </div>

    <div>
      <Label>Теги</Label>
      <ButtonPrimary @click="isTagModalOpen = true">
        <PlusIcon/>
      </ButtonPrimary>
      <div class="flex gap-2 mt-2">
        <Tag
            v-for="(tag, index) in tags"
            :key="index"
            :color="tag.color"
            :name="tag.name"
            @remove="removeTag(index)"
        />
      </div>
    </div>

    <ButtonPrimary :is-loading="isLoading" :is-disabled="isDisableBtn" @click="handleSubmit">
      Вывести значения
    </ButtonPrimary>

    <ErrorList :errors="errors" />

    <Modal :title="'Добавить кастомное поле'" :isOpen="isCustomFieldModalOpen" :setIsOpen="handleClose">
      <CreateCustomFieldForm
          :onSubmit="onSubmitCustomFields"
          :onCancel="handleClose"/>
    </Modal>

    <Modal :title="'Добавить тег'" :isOpen="isTagModalOpen" :setIsOpen="handleClose">
      <CreateTagForm
          :onSubmit="onSubmitTagForm"
          :onCancel="handleClose"/>
    </Modal>
  </div>
</template>
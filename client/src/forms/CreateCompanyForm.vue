<script setup lang="ts">
import {ref, watch} from 'vue';
import Input from "../sharedComponents/Input.vue";
import Label from "../sharedComponents/Label.vue";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import Modal from "../components/Modal.vue";
import CreateCustomFieldForm from "./CreateCustomFieldForm.vue";
import {ICompanyCreate, ICustomFieldValue, ICreateTag, ErrorResponse} from "../types.ts";
import CreateTagForm from "./CreateTagForm.vue";
import Tag from "../components/Tag.vue";
import CustomFieldsList from "../components/CustomField.vue";
import {useCompanyStore} from "../store/CompanyStore.ts";
import {CreateCompany} from "../api/company.ts";
import ErrorList from "../components/ErrorList.vue";


const companyStore = useCompanyStore()

const customFields = ref<ICustomFieldValue[]>([]);
const tags = ref<ICreateTag[]>([]);
const companyName = ref('');
const responsibleUserId = ref("11491022");
const errors = ref<string[]>([]);

const isDisableBtn = ref(true);
const isLoading = ref(false);
const isOpen = ref(false);
const isOpenTagModalForm = ref(false);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};

watch([companyName, responsibleUserId], (newValues) => {
  isDisableBtn.value = newValues.some(value => String(value).trim() === '');
});

const setIsOpenTagModalForm = (value: boolean) => {
  isOpenTagModalForm.value = value;
};

const handleOpenModal = () => {
  setIsOpen(true);
};

const onSubmitCustomFields = (data: ICustomFieldValue) => {
  customFields.value.push(data);
  setIsOpen(false);
};

const onSubmitTagForm = (data: ICreateTag) => {
  tags.value.push(data);
  setIsOpenTagModalForm(false);
};

const removeField = (index: number) => {
  customFields.value = customFields.value.filter((_, i) => i !== index);
};

const removeTag = (index: number) => {
  tags.value = tags.value.filter((_, i) => i !== index);
};

const handleClose = () => {
  setIsOpen(false);
};

const handleSubmit = () => {
  isLoading.value = true

  const formData: ICompanyCreate = {
    name: companyName.value,
    responsible_user_id: +responsibleUserId.value,
    custom_fields_values: customFields.value,
    tags_to_add: tags.value,
  };
  CreateCompany(formData).then((data) => {
    errors.value = []
    companyStore.addCompany(data);
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
    <h1 class="text-center text-lg font-semibold mb-2">Форма создания компании</h1>

    <div>
      <Label>Имя компании</Label>
      <Input v-model="companyName" :required="true" placeholder="Имя компании"/>
    </div>

    <div>
      <Label>ID пользователя, ответственного за компанию</Label>
      <Input type="number" v-model="responsibleUserId" placeholder="ID пользователя, ответственного за компанию"/>
    </div>

    <div>
      <Modal :title="'Добавить кастомное поле'" :isOpen="isOpen" :setIsOpen="setIsOpen">
        <CreateCustomFieldForm
            :onSubmit="onSubmitCustomFields"
            :onCancel="handleClose"/>
      </Modal>

      <Label>Кастомные поля</Label>
      <ButtonPrimary @click="handleOpenModal">
        <PlusIcon/>
      </ButtonPrimary>

      <CustomFieldsList :customFields="customFields" @removeField="removeField" />
    </div>

    <div>
      <Modal :title="'Добавить тег'" :isOpen="isOpenTagModalForm" :setIsOpen="setIsOpenTagModalForm">
        <CreateTagForm
            :onSubmit="onSubmitTagForm"
            :onCancel="handleClose"/>
      </Modal>

      <Label>Теги</Label>
      <ButtonPrimary @click="() => setIsOpenTagModalForm(true)">
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
      Вывести все значения
    </ButtonPrimary>

    <ErrorList :errors="errors" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Label from "../sharedComponents/Label.vue";
import Input from "../sharedComponents/Input.vue";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";
import PlusIcon from "../icons/PlusIcon.vue";
import Tag from "../components/Tag.vue";
import CustomField from "../components/CustomField.vue";
import Modal from "../components/Modal.vue";
import {ErrorResponse, IContactCreate, ICreateCustomFieldValue, ICreateTag} from "../types.ts";
import CreateCustomFieldForm from "./CreateCustomFieldForm.vue";
import CreateTagForm from "./CreateTagForm.vue";
import {CreateContact, IContactCreateResponse} from "../api/contact.ts";
import ErrorList from "../components/ErrorList.vue";
import {useContactStore} from "../store/ContactStore.ts";


const errors = ref<string[]>([]);
const customFields = ref<ICreateCustomFieldValue[]>([]);
const tags = ref<ICreateTag[]>([]);

const isCustomFieldModalOpen = ref(false);
const isTagModalOpen = ref(false);
const contactName = ref('');
const contactFirstName = ref('');
const contactLastName = ref('');
const responsibleUserId = ref('11491022');

const isDisableBtn = ref(true);
const isLoading = ref(false);

const contactStore = useContactStore()

watch(contactName, (newValue) => {
  isDisableBtn.value = newValue.trim() === '';
});

const removeCustomField = (index: number) => {
  customFields.value.splice(index, 1);
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
};

const handleClose = () => {
  isCustomFieldModalOpen.value = false;
  isTagModalOpen.value = false;
};

const onSubmitCustomFields = (data: ICreateCustomFieldValue) => {
  customFields.value.push(data);
  isCustomFieldModalOpen.value = false;
};

const onSubmitTagForm = (data: ICreateTag) => {
  tags.value.push(data);
  isTagModalOpen.value = false;
};

const handleSubmit = () => {
  isLoading.value = true
  const formData: IContactCreate = {
    name: contactName.value,
    first_name: contactFirstName.value,
    last_name: contactLastName.value,
    responsible_user_id: +responsibleUserId.value,
    custom_fields_values: customFields.value,
    tags_to_add: tags.value,
  };
  CreateContact(formData).then((data: IContactCreateResponse) => {
    errors.value = []
    contactStore.addContact(data);
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
    <h1 class="text-center text-lg font-semibold mb-2">Форма создания контакта</h1>

    <div>
      <Label>Название контакта</Label>
      <Input v-model="contactName" placeholder="Название контакта"/>
    </div>

    <div>
      <Label>Имя контакта</Label>
      <Input v-model="contactFirstName" placeholder="Имя контакта"/>
    </div>

    <div>
      <Label>Фамилия контакта</Label>
      <Input v-model="contactLastName" placeholder="Фамилия контакта"/>
    </div>

    <div>
      <Label>ID пользователя, ответственного за компанию</Label>
      <Input type="number" v-model="responsibleUserId" placeholder="ID пользователя, ответственного за компанию"/>
    </div>

    <div>
      <Label>Кастомные поля</Label>
      <ButtonPrimary @click="isCustomFieldModalOpen = true">
        <PlusIcon/>
      </ButtonPrimary>
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
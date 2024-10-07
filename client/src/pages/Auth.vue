<script setup lang="ts">
import {clientId, oauthUrl, redirectUri} from "../api/constant.ts";
import ButtonPrimary from "../sharedComponents/ButtonPrimary.vue";


const authorize = () => {
  const url = `${oauthUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=account`;
  window.location.href = url;
};
</script>

<template>
  <ButtonPrimary class="m-2" @click="authorize">
    Авторизоваться с AmoCRM
  </ButtonPrimary>
</template>

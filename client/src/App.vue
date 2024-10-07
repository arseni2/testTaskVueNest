<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAccessAndRefreshToken } from "./api/auth.ts";
import CompanyTable from "./components/CompanyTable.vue";

const router = useRouter();

onMounted(async () => {
  const accessToken = localStorage.getItem('accessToken');
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code');

  if (accessToken) {
    await router.push('/main');
    return;
  }

  if (authCode) {
    try {
      const tokens = await getAccessAndRefreshToken(authCode);
      if (tokens) {
        localStorage.setItem("accessToken", tokens.access_token);
        localStorage.setItem("refreshToken", tokens.refresh_token);
        await router.push('/main');
      } else {
        await router.push('/auth');
      }
    } catch (error) {
      await router.push('/auth');
    }
  } else {
    await router.push('/auth');
  }
});
</script>

<template>
  <router-view />
</template>

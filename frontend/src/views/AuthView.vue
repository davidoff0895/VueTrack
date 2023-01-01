<template>
  <div class="d-flex justify-center align-center h-100">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import appMode from '@/utils/appMode';
import { useTheme } from 'vuetify';
import { onMounted } from 'vue';
import useUserModule from '@/store/user/module';
import { useRouter } from 'vue-router';

const theme = useTheme();
const { isAuthorised } = useUserModule();
const router = useRouter();

onMounted(() => {
  if (isAuthorised.value) {
    return router.push('/');
  }
  theme.global.name.value = appMode.LIGHT;
});
</script>

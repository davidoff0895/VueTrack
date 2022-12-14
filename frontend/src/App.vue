<template>
  <v-app>
    <PreLoader v-if="isLoading" />
    <template v-else>
      <HeaderSection v-if="isAuthorised" />
      <v-main>
        <router-view />
      </v-main>
    </template>
  </v-app>
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue';
import useUserModule from '@/store/user/module';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';
import PreLoader from '@/components/common/PreLoader.vue';
import useGlobalModule from '@/store/global/module';
import { StatusCodes } from '@/api/statusCodes';

const { isAuthorised, getUser } = useUserModule();
const { isLoading, setLoader } = useGlobalModule();
const router = useRouter();

onMounted(async () => {
  try {
    setLoader(true);
    await getUser();
  } catch ({ response }) {
    if (response.status === StatusCodes.UNAUTHORISED) {
      return router.push('/auth/login');
    }
  }
  finally {
    setLoader(false);
  }
});
</script>

<style lang="scss">
@import "src/assets/scss/App";
</style>

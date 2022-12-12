<template>
  <v-app>
    <HeaderSection v-if="isAuthorised" />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue';
import useUserModule from '@/store/user/module';

const { isAuthorised } = useUserModule();
</script>

<style lang="scss">
@import "src/assets/scss/App";
</style>

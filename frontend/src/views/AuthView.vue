<template>
  <div class="d-flex justify-center align-center h-100">
    <div>
      <v-img
        :src="require('@/assets/svg/logo.svg')"
        width="90"
        class="ma-auto"
      />
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import appMode from '@/utils/appMode';
import { useTheme } from 'vuetify';

const theme = useTheme();
theme.global.name.value = appMode.LIGHT;
</script>

<style lang="scss" scoped>

</style>

<template>
  <router-view />
</template>

<script setup lang="ts">
import appMode from '@/utils/appMode';
import { useTheme } from 'vuetify';

const theme = useTheme();
theme.global.name.value = appMode.LIGHT;
</script>

<style lang="scss" scoped>

</style>

<template>
  <v-app>
    <HeaderSection />
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderSection from '@/components/HeaderSection.vue';
</script>

<style lang="scss">
@import "src/assets/scss/App";
</style>

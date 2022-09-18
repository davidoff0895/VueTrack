<template>
  <v-app>
    <v-app-bar app>
      <MainMenu />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainMenu from '@/components/MainMenu.vue';

export default defineComponent({
  name: 'App',
  components: { MainMenu },
  data() {
    return {
      //
    };
  },
});
</script>

<style lang="scss">
@import "src/assets/scss/App";
</style>

<template>
  <v-app>
    <!--    <v-app-bar app>-->
    <HeaderSection />
    <!--    </v-app-bar>-->
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HeaderSection from '@/components/HeaderSection.vue';

export default defineComponent({
  name: 'App',
  components: { HeaderSection },
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

<template>
  <v-container
    fluid
    class="main-menu spacing-playground pa-6"
  >
    <v-row class="text-center">
      <router-link
        key="logo"
        to="/"
        class="ml-3"
      >
        <v-img
          :src="require('/src/assets/logo.svg')"
          class="main-menu__logo"
          contain
        />
      </router-link>
      <router-link
        v-for="(menuItem, key) in menu"
        :key="key"
        :to="menuItem.path"
        class="main-menu__routes ml-8"
      >
        {{ menuItem.title }}
      </router-link>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mainMenu } from '@/static/mainMenu';

export default defineComponent({
  name: 'MainMenu',

  setup() {
    return {
      menu: mainMenu,
    };
  },
});
</script>

<style lang="scss" scoped>
  .main-menu {
    &__logo {
      width: 130px;
    }
    &__routes {
      margin: auto 0;
      font-size: 14px;
    }
  }
</style>

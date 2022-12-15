<template>
  <div class="main-menu d-flex">
    <router-link
      key="logo"
      to="/"
      class="ml-3 main-menu__link"
    >
      <v-card class="d-flex main-menu__logo">
        <v-img
          :src="require('@/assets/svg/logo.svg')"
          class="main-menu__logo__img"
          contain
        />
        <v-card-title class="main-menu__logo__text">
          VueTrack
        </v-card-title>
      </v-card>
    </router-link>
    <router-link
      v-for="(menuItem, key) in menu"
      :key="key"
      :to="menuItem.path"
      class="main-menu__routes ml-8"
    >
      {{ menuItem.title }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { mainMenu } from '@/static/mainMenu';

const menu = mainMenu;

</script>

<style lang="scss" scoped>
  .main-menu {
    &__link {
      text-decoration: none;
    }
    &__logo {
      background: none;
      box-shadow: none;
      &__img {
        width: 35px;
      }
      &__text {
        padding: 8px;
        font-weight: bold;
        //color: #ffffff;
      }
    }
    &__routes {
      margin: auto 0;
      font-size: 14px;
    }
  }
  .v-theme--dark {
    .main-menu__logo__text {
      color: #ffffff;
    }
  }
</style>

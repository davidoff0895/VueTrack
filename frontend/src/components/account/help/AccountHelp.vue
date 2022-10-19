<template>
  <v-menu
    class="account-help"
    transition="none"
    width="270"
  >
    <template #activator="{ props }">
      <v-icon
        color="#80929d"
        icon="mdi-help-circle-outline"
        class="ml-5 mt-1 account-help__icon"
        v-bind="props"
      />
      <AboutAppDialog
        v-if="isOpenedDialog"
        @close="closeAbout"
      />
    </template>
    <v-list class="account-help__list">
      <a
        v-for="({text, link}, index) in items"
        :key="index"
        :href="link"
        target="_blank"
        class="d-block mt-2 fz-14"
      >{{ text }}
      </a>
      <a
        href="#"
        class="d-block mt-2 fz-14"
        @click.prevent="openAbout"
      >About VueTrack</a>
      <div class="menu-list-footer mt-2 pt-3 fz-13">
        <div class="mt-4">
          <a href="https://www.jetbrains.com/youtrack/">VueTrack</a>
          - powerful project management for all your teams by JetBrains
        </div>
        <div class="mt-4">
          <div>Build 2022.2.57431</div>
          <div>Mon, Sep 26, 2022</div>
        </div>
      </div>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutAppDialog from '@/components/account/help/AboutAppDialog.vue';
import { aboutItems } from '@/static/aboutItems';

const items = aboutItems;
const isOpenedDialog = ref(false);
const openAbout = () => isOpenedDialog.value = true;
const closeAbout = () => {
  isOpenedDialog.value = false;
};
</script>

<style lang="scss">
.account-help {
  &__icon {
    cursor: pointer;
    transition: color .3s ease-out;
    &:hover {
      color: $icon-hover !important;
    }
  }
}
</style>

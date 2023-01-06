<template>
  <v-menu
    class="account-settings"
    transition="none"
    width="90"
  >
    <template #activator="{ props }">
      <v-icon
        icon="mdi-cog-outline"
        class="ml-5 mt-1 account-settings__icon"
        :class="{active: isActive(props['aria-expanded'])}"
        v-bind="props"
      />
    </template>
    <v-list class="account-settings__list">
      <router-link
        v-for="({text, link}, index) in items"
        :key="index"
        :to="link"
        class="d-block mt-2 fz-14"
      >
        {{ text }}
      </router-link>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { settingsItems } from '@/static/settingsItems';

const items = settingsItems;

const isActive = (isAriaExpanded) => {
  return isAriaExpanded === 'true';
};
</script>

<style lang="scss" scoped>
.account-settings {
  &__icon {
    cursor: pointer;
    transition: all .3s ease-out;
    color: var(--icon);
    &:hover {
      color: var(--border-hover) !important;
    }
  }
  &__icon.active {
    transform: rotate(90deg);
  }
}
</style>

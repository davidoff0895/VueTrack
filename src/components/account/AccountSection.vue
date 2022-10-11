<template>
  <div class="account position-relative">
    <div class="d-flex justify-end">
      <v-icon
        v-for="({icon, content}, key) in menuItems"
        :key="key"
        :icon="icon"
        @click="setActiveComponent(content)"
        class="ml-5 mt-1 account__icon"
      />
      <img
        :src="require('/src/assets/svg/profile.svg')"
        class="account__img ml-5"
        alt="user"
      >
    </div>
    <component
      v-if="activeSection"
      :is="activeSection"
      @close="setActiveComponent('')"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import AccountHelp from '@/components/account/help/AccountHelp.vue';

const menuItems = [
  { icon: 'mdi-help-circle-outline', content: AccountHelp },
];
const activeSection = ref('');
const setActiveComponent = (content: string) =>
  activeSection.value = content;
</script>

<style lang="scss">
.account {
  .v-icon {
    color: $gray
  }
  &__icon {
    cursor: pointer;
    transition: color .3s ease-out;
    &:hover {
      color: $icon-hover;
    }
  }
  &__img {
    width: 32px;
  }
  &__tooltip {
    position: absolute;
    top: 45px;
    right: 90px;
    z-index: 1;
  }
}
</style>

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
<script lang="ts">
import { defineComponent, ref } from 'vue';
import AccountSettings from '@/components/account/AccountSettings.vue';
import AccountHelp from '@/components/account/help/AccountHelp.vue';

export default defineComponent({
  name: 'AccountSection',
  components: { AccountHelp, AccountSettings },
  setup() {
    const menuItems = [
      { icon: 'mdi-help-circle-outline', content: 'AccountHelp' },
      { icon: 'mdi-cog-outline', content: 'AccountSettings' },
    ];
    const activeSection = ref('');
    const setActiveComponent = (content: string) =>
      activeSection.value = content;
    return {
      menuItems,
      activeSection,
      setActiveComponent,
    };
  },
});
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

<template>
  <div class="account d-flex justify-end">
    <v-icon
      v-for="({icon}, key) in icons"
      :key="key"
      :icon="icon"
      class="ml-5 mt-1 account__icon"
    />
    <img
      :src="require('/src/assets/svg/profile.svg')"
      class="account__img ml-5"
      alt="user"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AccountSection',

  setup() {
    const icons = [
      { icon: 'mdi-bell-ring-outline' },
      { icon: 'mdi-help-circle-outline' },
      { icon: 'mdi-cog-outline' },
    ];
    return {
      icons,
    };
  },
});
</script>

<style lang="scss">
.account {
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
}
</style>

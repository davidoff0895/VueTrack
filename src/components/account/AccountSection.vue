<template>
  <div class="account">
    <div class="d-flex justify-end">
      <component
        v-for="(menuItem, key) in menuItems"
        :key="key"
        :is="menuItem"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import AccountHelp from '@/components/account/help/AccountHelp.vue';
import AccountProfile from '@/components/account/AccountProfile.vue';

const menuItems = [AccountHelp, AccountProfile];
</script>

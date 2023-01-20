<template>
  <div>
    <v-text-field
      v-model="searchText"
      variant="outlined"
      clearable
      persistent-clear
      placeholder="Filter users"
      prepend-inner-icon="mdi-magnify"
      type="text"
    />
    <h2 class="mt-3">
      {{ users.length }} Users
    </h2>
    <div class="mt-5 d-flex justify-space-between">
      <v-btn
        color="primary"
      >
        New user...
      </v-btn>
      <v-btn
        variant="outlined"
      >
        <v-icon icon="mdi-chevron-left" />
        Details
      </v-btn>
    </div>
    <v-table />
  </div>
</template>

<script setup lang="ts">
import useUserModule from '@/store/user/module';
import { onMounted, ref } from 'vue';

const { getUsers } = useUserModule();
const users = ref([]);
const searchText = ref('');

onMounted(async () => {
  users.value = await getUsers();
});
</script>

<style lang="scss" scoped>

</style>

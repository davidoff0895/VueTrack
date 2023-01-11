<template>
  <div>
    <h3>{{ users.length }} Users</h3>
  </div>
</template>

<script setup lang="ts">
import useUserModule from '@/store/user/module';
import { onMounted, ref } from 'vue';

const { getUsers } = useUserModule();
const users = ref([]);

onMounted(async () => {
  users.value = await getUsers();
});
</script>

<style lang="scss" scoped>

</style>

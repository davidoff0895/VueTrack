<template>
  <v-autocomplete
    v-model="searchUser"
    v-model:search="search"
    :items="filteredUsers"
    @input="inputUser"
    @click="clear"
    class="users-filter"
    variant="outlined"
    placeholder="Filter users"
    prepend-inner-icon="mdi-magnify"
    append-inner-icon
    item-title="login"
    item-value="login"
    hide-no-data
    clearable
    no-filter
    return-object
    menu
  >
    <template #item="data">
      <v-list-item
        v-bind="data.props"
        :prepend-avatar="data.item?.raw?.avatar"
        :title="data.item?.raw?.login"
      />
    </template>
  </v-autocomplete>
</template>

<script setup lang="ts">
import { Ref, ref, watch } from 'vue';
import { UserTable } from '@/types/user/userTable';

const emit = defineEmits(['filterUsers']);

const props = defineProps<{users: UserTable[]}>();

const searchUser = ref(null);
const filteredUsers: Ref<UserTable[]> = ref([]);
const search = ref(null);

watch(searchUser, (user) => emit('filterUsers', user));
watch(search, (val) => val && filterUsers(val));
watch(props.users, (val) => console.log(val), { deep: true });

const inputUser = ({ target }) => {
  if (!target.value) {
    searchUser.value = null;
    filteredUsers.value = [];
  }
};
const clear = () => filteredUsers.value = [];
const filterUsers = (query) => {
  filteredUsers.value = props.users.filter(({ login }) =>
    login.includes(query),
  );
};
</script>


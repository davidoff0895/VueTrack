<template>
  <div class="users-list">
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
      {{ accounts.length }} Users
      <v-icon
        icon="mdi-help-circle-outline"
        class="fz-15 cursor-pointer"
        :color="activeIconColor"
        @click="toggleUserInfo"
      />
    </h2>
    <v-card
      v-if="isUserInfo"
      class="mt-3 pa-1 pt-2 fz-14 users-list__info"
      variant="outlined"
    >
      <v-icon
        icon="mdi-close"
        class="pr-2 float-right cursor-pointer"
        color="secondary"
        @click="toggleUserInfo"
      />
      <v-card-text>
        This list displays all of the user accounts that are registered
        in VueTrack. Filter the list of users by attributes, including name,
        login, access permissions, group, and ban status. The search box
        provides query completion to help you choose from available search
        attributes.
      </v-card-text>
    </v-card>
    <div class="mt-7 d-flex justify-space-between">
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
    <v-table
      class="mt-5 users-table"
      table-background="#fff"
    >
      <thead>
        <tr>
          <th class="users-table__checkbox">
            <v-checkbox
              v-model="isSelectedAll"
              @click="checkAll"
              class="d-inline-flex"
            />
          </th>
          <th
            class="cursor-pointer"
            @click="sortBy('name')"
          >
            Full name
            <v-icon :icon="sortByIcon('name')" />
          </th>
          <th
            class="cursor-pointer"
            @click="sortBy('login')"
          >
            Username
            <v-icon :icon="sortByIcon('login')" />
          </th>
          <th
            class="cursor-pointer"
            @click="sortBy('createdAt')"
          >
            Registration date
            <v-icon :icon="sortByIcon('createdAt')" />
          </th>
        </tr>
      </thead>
      <tbody class="users-table__tbody">
        <tr
          v-for="user in accounts"
          :key="user.id"
          :class="{
            active: isSelectedUser(user.id),
            checked: user.isChecked,
          }"
          class="users-table__tbody__row"
          @click="selectUser(user)"
        >
          <td>
            <v-checkbox
              v-model="user.isChecked"
              class="d-inline-flex"
            />
          </td>
          <td class="d-flex align-center">
            <img
              :src="user.avatar"
              width="20"
              class="mr-2"
            >
            <router-link :to="user.profileLink">
              {{ user.name }}
            </router-link>
          </td>
          <td>{{ user.login }}</td>
          <td>{{ user.registrationDate }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import useUserModule from '@/store/user/module';
import { computed, onMounted, Ref, ref, watch } from 'vue';
import { MMMDyyyy } from '@/utils/dateFormat.js';
import { UserTable } from '@/types/user/usersTable';

const DECREACE = 'down';
const INCREACE = 'up';

const { getUsers } = useUserModule();
const searchText = ref('');
const accounts: Ref<UserTable[]> = ref([]);
const isSelectedAll = ref(false);
const isUserInfo = ref(false);
const selectedUser: ref<UserTable> = ref({});
const activeSort = ref({});

onMounted(async () => {
  const users = await getUsers();
  accounts.value = users.map((user) => ({
    ...user,
    isChecked: false,
    registrationDate: MMMDyyyy(user.createdAt),
    profileLink: `/users/${user.id}`,
  }));
});

const validateAllCheck = watch(accounts, () => {
  const notCheckedUser = accounts.value.find(({ isChecked }) => !isChecked);
  isSelectedAll.value = !notCheckedUser;
}, { deep: true });

const activeIconColor = computed(() =>
  isUserInfo.value ? 'secondary' : 'primary',
);

const selectUser = (user: UserTable) => {
  selectedUser.value = user;
};
const isSelectedUser = (userId: string) => userId === selectedUser.value.id;

const toggleUserInfo = () => isUserInfo.value = !isUserInfo.value;
const sortBy = (key: string) => {
  activeSort.value = activeSort.value[key] === INCREACE
    ? { [key]: DECREACE } : { [key]: INCREACE };
  accounts.value.sort((a, b) => activeSort.value[key] === DECREACE
    ? b[key].localeCompare(a[key]) : a[key].localeCompare(b[key]));
};
const sortByIcon = (key: string) => {
  const activeFilter = activeSort.value[key];
  return activeFilter ? `mdi-chevron-${activeFilter}`
    : 'mdi-unfold-more-horizontal';
};
const checkAll = () => {
  accounts.value.forEach((user, i) => {
    accounts.value[i].isChecked = !isSelectedAll.value;
  });
};
</script>

<style lang="scss">
.users-list {
  &__info {
    background: var(--ring-sidebar-background-color);
    border-color: $line;
    border-radius: 2px;
  }
  .v-selection-control--density-default {
    width: 0;
  }
}
.users-table {
  &__checkbox {
    width: 50px;
  }
  &__tbody {
    &__row.checked {
      background: var(--ring-selected-background-color);
    }
  }
}
</style>

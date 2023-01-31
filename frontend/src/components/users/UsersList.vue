<template>
  <div class="users-list">
    <UserFilter
      :users="accounts"
      @filterUsers="filterUsers"
    />

    <h2 class="mt-3 users-list__title">
      {{ accounts.length }} Users
      <v-icon
        icon="mdi-help-circle-outline"
        class="fz-15 cursor-pointer users-list__title__icon"
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
      <div>
        <v-btn
          color="primary"
          @click="isNewUser = true"
        >
          New user...
        </v-btn>
        <NewUserDialog
          v-if="isNewUser"
          @close="closeNewUser"
        />
        <v-btn
          v-if="isDeleteBtn"
          variant="outlined"
          color="error"
          class="ml-2"
          @click="isDeleteUser = true"
        >
          Delete
        </v-btn>
        <DeleteUserDialog
          v-if="isDeleteUser"
          :selected-users="selectedUsers"
          @close="closeDeleteDialog"
        />
      </div>
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
          v-for="account in accounts"
          :key="account.id"
          :class="{
            active: isSelectedUser(account.id),
            checked: account.isChecked,
          }"
          class="users-table__tbody__row"
          @click="selectUser(account)"
        >
          <td>
            <v-checkbox
              v-model="account.isChecked"
              class="d-inline-flex"
            />
          </td>
          <td class="d-flex align-center">
            <img
              :src="account.avatar"
              width="20"
              class="mr-2"
            >
            {{ account.login }}
          </td>
          <td>{{ account.registrationDate }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script setup lang="ts">
import useUserModule from '@/store/user/module';
import { computed, onMounted, Ref, ref, watch } from 'vue';
import { MMMDyyyy } from '@/utils/dateFormat.js';
import NewUserDialog from '@/components/users/NewUserDialog.vue';
import DeleteUserDialog from '@/components/users/DeleteUserDialog.vue';
import UserFilter from '@/components/users/UserFilter.vue';
import { User } from '@/types/user/user';
import { UserTable } from '@/types/user/userTable';

const DECREACE = 'down';
const INCREACE = 'up';

const { getUsers, users, user } = useUserModule();
const accounts: Ref<UserTable[]> = ref([]);
const isSelectedAll = ref(false);
const isUserInfo = ref(false);
const isNewUser = ref(false);
const isDeleteUser = ref(false);
const selectedUser: Ref<UserTable> = ref(null);
const activeSort = ref({});

onMounted(() => {
  fetchUsers();
});

watch(accounts, () => {
  const notCheckedUser = accounts.value.find(({ isChecked }) => !isChecked);
  isSelectedAll.value = !notCheckedUser;
}, { deep: true });

const isDeleteBtn = computed(() => selectedUsers.value.length
  && !selectedUsers.value.map(({ id }) => id).includes(user.value.id));
const activeIconColor = computed(() =>
  isUserInfo.value ? 'secondary' : 'primary',
);
const selectedUsers = computed(() => {
  const checkedUsers = accounts.value.filter(({ isChecked }) => isChecked);
  if (checkedUsers.length) {
    return checkedUsers;
  }
  if (selectedUser.value) {
    return [selectedUser.value];
  }
  return [];
});

const selectUser = (user: UserTable) => {
  selectedUser.value = user;
};
const isSelectedUser = (userId: string) => userId === selectedUser.value?.id;
const fetchUsers = async (isUpdate = true) => {
  if (isUpdate) {
    await getUsers();
  }
  accounts.value = users.value.map((user) => fillUserInfo(user));
};
const fillUserInfo = (user: User): UserTable => ({
  ...user,
  isChecked: false,
  registrationDate: MMMDyyyy(user.createdAt),
  profileLink: `/users/${user.id}`,
});
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
const closeNewUser = (user) => {
  if (user) {
    accounts.value.push(fillUserInfo(user));
  }
  isNewUser.value = false;
};
const closeDeleteDialog = async (isRemoved = false) => {
  if (isRemoved) {
    await fetchUsers();
  }
  isDeleteUser.value = false;
  selectedUser.value = null;
};
const filterUsers = (user) => {
  selectedUser.value = null;
  if (user) {
    return accounts.value = [user];
  }
  fetchUsers(false);
};
</script>

<style lang="scss">
.users-list {
  &__info {
    background: var(--ring-sidebar-background-color);
    border-color: var(--ring-line-color);
    border-radius: 2px;
    .mdi-close {
      color: var(--icon) !important;
    }
  }
  .v-selection-control--density-default {
    width: 0;
  }
  .v-field .v-field__clearable {
    opacity: 1;
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
.users-list__title__icon.text-secondary {
  color: var(--icon) !important;
}
</style>

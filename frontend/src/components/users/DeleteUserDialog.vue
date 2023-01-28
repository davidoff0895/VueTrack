<template>
  <v-dialog
    v-model="isOpenedDialog"
    max-width="450"
    @click:outside="emit('close')"
  >
    <v-container
      fluid
    >
      <v-card class="pt-2 pl-3">
        <v-card-title class="text-h5 font-weight-bold">
          Delete user
        </v-card-title>
        <v-form @submit.prevent="submit">
          <v-card-text class="mt-8">
            <div>
              When you confirm this action, the user account for test is
              deleted. The replacement user inherits references to deleted
              users that cannot be empty, like visibility settings and
              ownership assignments. Other references are set to "Deleted
              User". This operation cannot be undone.
            </div>
            <div class="mt-3">
              If you want the replacement user to inherit all references to
              the deleted user, use the merge operation instead.
            </div>
            <v-row class="mt-4">
              <v-col cols="5">
                <div class="fz-13">
                  Replacement user
                </div>
              </v-col>
              <v-col cols="7">
                <v-autocomplete
                  v-model="selectedUser"
                  :items="users"
                  variant="outlined"
                  placeholder="Select user"
                  item-title="name"
                  item-value="name"
                >
                  <template #item="{ props, item }">
                    <v-list-item
                      v-bind="props"
                      :prepend-avatar="item?.raw?.avatar"
                      :title="item?.raw?.name"
                    />
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              variant="outlined"
              :disabled="!selectedUser"
            >
              Create
            </v-btn>
            <v-btn
              variant="outlined"
              @click="emit('close')"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import useUserModule from '@/store/user/module';
import { User } from '@/types/user/user';

const emit = defineEmits(['close']);
const { deleteUser, users } = useUserModule();

const props = defineProps<{selectedUsers: User[]}>();

const selectedUser = ref(null);

const isOpenedDialog = ref(true);

const submit = async () => {
  await Promise.all(props.selectedUsers.map(({ id }) =>
    deleteUser(id, selectedUser),
  ));
  emit('close');
};
</script>

<style lang="scss" scoped>

</style>

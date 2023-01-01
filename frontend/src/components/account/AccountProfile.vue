<template>
  <v-menu
    class="account-profile"
    transition="none"
  >
    <template #activator="{ props }">
      <img
        v-bind="props"
        :src="user.avatar"
        class="account-profile__img ml-5"
        alt="user"
      >
      <DialogLoginForm
        v-if="isLoginForm"
        @close="toggleLogin"
      />
    </template>
    <v-list class="account-profile__list">
      <v-list-item class="account-profile__list__item">
        <router-link to="/user/me">
          Profile
        </router-link>
      </v-list-item>
      <v-list-item
        class="account-profile__list__item account-profile__list__dropdown"
      >
        <v-menu
          open-on-hover
          location="start"
          transition="none"
        >
          <template #activator="{ props }">
            <div v-bind="props">
              <v-icon
                icon="mdi-chevron-left"
                class="position-absolute account-profile__list__icon"
              />
              Appearance
            </div>
          </template>

          <v-list class="account-profile__list__sub">
            <v-radio-group
              v-model="appTheme"
            >
              <div class="list-title mt-1">
                THEME
              </div>
              <v-radio
                v-for="({label, value}, index) in radioButtons"
                :key="index"
                color="primary"
                class="account-profile__list__sub__label mt-2 fz-13"
                :label="label"
                :value="value"
              />
            </v-radio-group>
            <div class="menu-list-footer pt-3 fz-13 text-center">
              <router-link :to="routerParams">
                <div class="mt-4">
                  More settings...
                </div>
              </router-link>
            </div>
          </v-list>
        </v-menu>
      </v-list-item>
      <v-list-item
        class="account-profile__list__item"
        @click="toggleLogin"
      >
        Switch user
      </v-list-item>
      <v-list-item
        class="account-profile__list__item"
        @click="logout"
      >
        Log out
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useTheme } from 'vuetify';
import appMode from '@/utils/appMode';
import useUserModule from '@/store/user/module';
import { redirectToLogin } from '@/router/redirectToLogin';
import DialogLoginForm from '@/components/auth/DialogLoginForm.vue';

const theme = useTheme();
const { logOut } = useUserModule();

const radioButtons = [
  { label: 'Light', value: appMode.LIGHT },
  { label: 'Dark', value: appMode.DARK },
  { label: 'Sync with OS', value: appMode.SYNC_OS },
];
const routerParams = {
  path: '/user/me',
  query: { tab: 'workspace' },
};

const appTheme = ref(appMode.mode);
const isLoginForm = ref(false);
const { user } = useUserModule();

watch(appTheme, (newMode) => {
  theme.global.name.value = newMode === appMode.SYNC_OS ?
    appMode.userPcMode : newMode;
  appMode.setAppMode(newMode);
}, { immediate: true });

const logout = async () => {
  await logOut();
  return redirectToLogin();
};
const toggleLogin = () => {
  isLoginForm.value = !isLoginForm.value;
};
</script>

<style lang="scss">
.account-profile.v-menu .v-list {
  padding-left: 0;
  padding-right: 0;
}
.account-profile {
  &__img {
    width: 32px;
  }
  &__list {
    &__item {
      &:hover {
        .v-list-item__content {
          color: $link-hover;
        }
      }
    }
    &__icon {
      font-size: 16px;
      left: 6px;
      top: 8px;
    }
    &__sub {
      right: 40px;
    }
    &__dropdown {
      &:hover {
        background: $menu-hover;
        .v-list-item__content {
          color: $link;
        }
      }
    }
  }
}
</style>

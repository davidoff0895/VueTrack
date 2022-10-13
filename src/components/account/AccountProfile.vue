<template>
  <v-menu
    class="account-profile"
    transition="none"
  >
    <template #activator="{ props }">
      <img
        v-bind="props"
        :src="require('@/assets/svg/profile.svg')"
        class="account-profile__img ml-5"
        alt="user"
      >
    </template>
    <v-list class="account-profile__list">
      <v-list-item>
        <router-link to="/user/me">
          Profile
        </router-link>
      </v-list-item>
      <v-list-item>
        <v-menu
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
                v-for="({label, value}, index) in radioBtns"
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
      <v-list-item>
        Log out
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
import { RouteLocation } from 'vue-router';
import { ref } from 'vue';
import { AppModes } from '@/static/enums/appModes';

const radioBtns = [
  { label: 'Light', value: AppModes.LIGHT },
  { label: 'Dark', value: AppModes.DARK },
  { label: 'Sync with OS', value: AppModes.SYNC_OS },
];
const routerParams: RouteLocation = {
  path: '/user/me',
  query: { tab: 'workspace' },
};
const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  .matches;
const appMode = isDarkMode ? AppModes.SYNC_OS : AppModes.LIGHT;
const appTheme = ref(appMode);
</script>

<style lang="scss">
.account-profile {
  &__img {
    width: 32px;
  }
  &__list {
    &__icon {
      font-size: 16px;
      left: -6px;
      top: 6px;
    }
    &__sub {
      right: 40px;
    }
  }
}
</style>

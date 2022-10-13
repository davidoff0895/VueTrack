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
            <div>
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
            </div>
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

const radioBtns = [
  { label: 'Light', value: '1' },
  { label: 'Dark', value: '2' },
  { label: 'Sync with OS', value: '3' },
];
const routerParams: RouteLocation = {
  path: '/user/me',
  query: { tab: 'workspace' },
};
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

<template>
  <v-container
    fluid
    class="not-found"
  >
    <v-row
      justify="center"
      class="ma-16"
    >
      <v-col class="v-col-md-3">
        <v-img :src="require('@/assets/svg/404.svg')" />
      </v-col>
      <v-col class="v-col-md-3 d-flex not-found__text">
        <v-card>
          <v-card-title class="text-h5">
            Nope, can't find it!
          </v-card-title>
          <v-card-text>
            It could mean that the URL points to a page that doesn't exist or
            the URL is correct and you don't have permission to view this
            content.
          </v-card-text>
          <v-card-text>
            <router-link
              v-for="(menuItem, key) in menu"
              :key="key"
              :to="menuItem.path"
              class="ma-1"
            >
              {{ menuItem.title }}
            </router-link>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { globalMenu } from '@/static/mainMenu';

export default {
  name: 'PageNotFound',

  setup() {
    return {
      menu: globalMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
.not-found {
  &__text {
    align-items: center;
  }
  .v-card--variant-elevated {
    box-shadow: none;
  }
}
</style>

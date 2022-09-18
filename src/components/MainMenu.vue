<template>
  <v-container fluid class="main-menu">
    <v-row class="text-center">
      <nav>
        <router-link to="/dashboard" class="main-menu__link">
          <v-img
            :src="require('../assets/logo.svg')"
            class="main-menu__link__logo"
            contain
          />
        </router-link>
<!--        </a>-->
<!--        <ul>-->
<!--          <li></li>-->
<!--        </ul>-->
      </nav>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainMenu',

  setup() {
    return {}
  }
});
</script>

<style lang="scss" scoped>
  .main-menu {
    &__link {
      display: block;
      padding: 0 12px 3px;
      &__logo {
        width: 130px;
        height: 40px;
      }
    }
  }
</style>

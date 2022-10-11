<template>
  <div class="about">
    <a
      href="#"
      @click.prevent="openDialog"
    >About VueTrack</a>

    <v-dialog
      v-model="isOpenedDialog"
      max-width="465"
      @click:outside="closeDialog"
    >
      <v-card>
        <div class="position-relative">
          <v-img
            class="about__img"
            :src="require('@/assets/img/about.png')"
          />
          <div class="text-center about__copyright fz-13">
            {{ copyRightText }}
          </div>
        </div>
        <v-card-actions class="flex-column align-start fz-13 pa-5">
          <a
            v-for="({text, link}, index) in links"
            :key="index"
            :href="link"
            class="mt-1"
          >
            {{ text }}
          </a>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const links = [
  { text: 'YouTrack Website', link: 'https://www.jetbrains.com/youtrack/' },
  { text: 'Terms of Service', link: 'https://www.jetbrains.com/legal/docs/' +
      'youtrack/youtrack_incloud/',
  },
];
const emit = defineEmits(['close']);
const isOpenedDialog = ref(false);
const copyRightText = ref(`Copyright ©
  2009–${new Date().getFullYear()} JetBrains s.r.o.`);
const openDialog = () => isOpenedDialog.value = true;
const closeDialog = () => emit('close');
</script>

<style lang="scss" scoped>
.about {
  &__img {
    z-index: -1;
  }
  &__copyright {
    margin-top: -30px;
    color: #fff;
  }
}
</style>

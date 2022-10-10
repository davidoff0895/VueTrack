<template>
  <v-dialog
    v-model="isOpenedDialog"
    width="270"
    class="help"
    transition
    @click:outside="closeDialog"
  >
    <v-card
      dark
      class="help__card"
    >
      <v-card-text>
        <a
          v-for="({text, link}, index) in items"
          :key="index"
          :href="link"
          target="_blank"
          class="d-block mt-2 help__text"
        >{{ text }}
        </a>
        <AboutAppDialog class="mt-2 help__text" />
      </v-card-text>
      <div class="help__footer mt-5">
        <div class="mt-4">
          <a href="https://www.jetbrains.com/youtrack/">VueTrack</a>
          - powerful project management for all your teams by JetBrains
        </div>
        <div class="mt-4">
          <div>Build 2022.2.57431</div>
          <div>Mon, Sep 26, 2022</div>
        </div>
      </div>
    </v-card>
    <AboutAppDialog />
  </v-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AboutAppDialog from '@/components/account/help/AboutAppDialog.vue';
import { aboutItems } from '@/static/aboutItems';

const isOpenedDialog = ref(true);
const emit = defineEmits<{
  (e: 'close'): void
}>();
const items = aboutItems;
const closeDialog = () => emit('close');
</script>

<style lang="scss">
.help {
  .v-overlay__content {
    right: 80px;
    top: 30px;
  }
  .v-overlay__scrim {
    background: none;
  }
  &__card {
    background: $dark;
    padding: 10px 15px;
  }
  &__text, &__footer {
    font-size: 13px;
  }
  &__footer {
    color: $gray;
    &::before {
      position: absolute;
      left: 0;
      content: '';
      width: 100%;
      height: 1px;
      background: $line;
    }
  }
}
.help.v-dialog .v-overlay__content > .v-card {
  border-radius: 2px;
  > .v-card-text {
    padding: unset;
  }
}
</style>

<template>
  <v-dialog
    v-model="isOpenedDialog"
    max-width="400"
    @click:outside="closeDialog"
    class="login-dialog"
  >
    <v-btn
      class="login-dialog__close fz-13"
      icon
      @click="closeDialog"
    >
      <v-icon icon="mdi-close" />
    </v-btn>
    <LoginForm @successfulLogin="closeDialog" />
  </v-dialog>
</template>

<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import { ref } from 'vue';

const emit = defineEmits(['close']);

const isOpenedDialog = ref(true);
const closeDialog = () => emit('close');
</script>

<style lang="scss">
.login-dialog {
  .v-overlay__content {
    background: #fff;
    padding: 30px 0;
    box-shadow: 0 2px 16px gray;
  }
  &__close {
    right: -35px;
    top: -10px;
    position: absolute;
    background: none;
    box-shadow: none;
    &:hover {
      box-shadow: none;
    }
  }
  &__close.v-btn {
    color: transparent;
    .v-btn__content {
      color: $link-hover;
    }
  }
}
</style>

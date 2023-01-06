<template>
  <v-form
    class="auth-form"
    @submit.prevent="emit('submit')"
  >
    <v-img
      :src="require('@/assets/svg/logo.svg')"
      width="90"
      class="ma-auto"
    />
    <div class="text-center mt-3 mb-6">
      <div class="text-black auth-form__title">
        {{ title }}
      </div>
      <div class="text-center fz-13 error mt-1">
        {{ errorMessage }}
      </div>
    </div>
    <slot name="fields" />
    <v-btn
      type="submit"
      block
      class="mt-2"
      color="primary"
      :variant="btnStyle"
      :disabled="isDisabled"
    >
      {{ btnText }}
    </v-btn>
    <slot name="links" />
  </v-form>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { global } from '@/consts/global';
import useUserModule from '@/store/user/module';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: { type: String, required: true },
  btnText: { type: String, required: true },
  btnStyle: { type: String, default: () => 'elevated' },
  isDisabled: { type: Boolean, default: () => false },
});

const route = useRoute();
const emit = defineEmits(['submit']);
const { userError } = useUserModule();

const errorMessage = computed(() => userError.value?.message);

onMounted(() => {
  (document as any).title = route.meta.title || global.DEFAULT_DOC_TITLE;
});
if (route.name === 'auth') {
  onBeforeRouteLeave(() => {
    (document as any).title = global.DEFAULT_DOC_TITLE;
  });
}

</script>

<style lang="scss" scoped>
.auth-form {
  width: 280px;
  margin: auto;
  &__title {
    font-size: 20px;
  }
  &__link {
    font-size: 14px;
  }
}
</style>

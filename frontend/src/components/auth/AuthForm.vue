<template>
  <v-form class="auth-form">
    <div class="text-black text-center auth-form__title mt-3 mb-7">
      {{ title }}
    </div>
    <slot name="fields" />
    <v-btn
      block
      class="mt-2"
      color="primary"
      :variant="btnStyle"
      :disabled="isDisabled"
      @click="emit('submit')"
    >
      {{ btnText }}
    </v-btn>
    <slot name="links" />
  </v-form>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { global } from '@/consts/global';

const props = defineProps({
  title: { type: String, required: true },
  btnText: { type: String, required: true },
  btnStyle: { type: String, default: () => 'elevated' },
  isDisabled: { type: Boolean, default: () => false },
});

const route = useRoute();
const emit = defineEmits(['submit']);

onMounted(() => {
  (document as any).title = route.meta.title;
});
onBeforeRouteLeave(() => {
  (document as any).title = global.DEFAULT_DOC_TITLE;
});

</script>

<style lang="scss" scoped>
.auth-form {
  width: 280px;
  &__title {
    font-size: 20px;
  }
  &__link {
    font-size: 14px;
  }
}
</style>

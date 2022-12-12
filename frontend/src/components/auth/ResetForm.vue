<template>
  <v-form class="reset-form">
    <div class="text-black text-center reset-form__title mt-3 mb-7">
      Reset password for VueTrack
    </div>
    <v-text-field
      v-model="user.login"
      :error-messages="validationErrors.login"
      placeholder="Email"
      required
      @input="$v.login.$touch"
    />
    <v-btn
      class="w-100 mt-2"
      color="primary"
      :disabled="$v.$invalid"
      @click="submit"
    >
      Reset password
    </v-btn>
    <router-link
      to="/auth/login"
      class="reset-form__link fz-14 ring-link d-block text-center mt-3"
    >
      Go back to login page
    </router-link>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { required, email } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { global } from '@/consts/global';

const rules = {
  login: { required, email },
};

const user = reactive({
  login: null,
});

const { $v, validationErrors } = useValidation(rules, user);
const route = useRoute();
const router = useRouter();

onMounted(() => {
  (document as any).title = route.meta.title;
});
onBeforeRouteLeave(() => {
  (document as any).title = global.DEFAULT_DOC_TITLE;
});

const submit = async () => {
  const isValid = await $v.value.$validate();
  if (!isValid) {
    return;
  }
  router.push('/auth');
};
</script>

<style lang="scss" scoped>
.reset-form {
  width: 280px;
  &__title {
    font-size: 20px;
  }
  &__link {
    font-size: 14px;
  }
}
</style>

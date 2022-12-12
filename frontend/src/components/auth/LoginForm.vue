<template>
  <div class="d-flex justify-center align-center h-100">
    <v-form
      class="auth-form"
      ref="form"
      lazy-validation
    >
      <v-img
        :src="require('@/assets/svg/logo.svg')"
        width="90"
        class="ma-auto"
      />
      <div class="text-black text-center auth-form__title mt-3 mb-5">
        Log in to VueTrack
      </div>
      <v-text-field
        v-model="user.login"
        :error-messages="validationErrors.login"
        placeholder="Username or Email"
        required
        @input="$v.login.$touch"
      />
      <v-text-field
        type="password"
        v-model="user.password"
        :error-messages="validationErrors.password"
        placeholder="Password"
        required
        @input="$v.password.$touch"
      />
      <div class="d-flex mt-5">
        <v-checkbox
          v-model="user.isRemember"
          label="Remember me"
          required
        />
        <router-link
          to="/auth/restore"
          class="auth-form__link fz-14 ring-link"
        >
          Reset password
        </router-link>
      </div>
      <v-btn
        class="w-100"
        color="primary"
        @click="submit"
      >
        Log in
      </v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
import { global } from '@/consts/global';

const rules = {
  login: { required },
  password: { required },
};

const user = reactive({
  login: null,
  password: null,
  isRemember: false,
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
.auth-form {
  width: 250px;
  &__title {
    font-size: 20px;
  }
  &__link {
    font-size: 14px;
  }
}
</style>

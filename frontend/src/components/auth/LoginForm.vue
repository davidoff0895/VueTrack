<template>
  <AuthForm
    title="Log in to VueTrack"
    btn-text="Log in"
    class="login-form"
    @submit="submit"
  >
    <template #fields>
      <v-text-field
        v-model="userForm.username"
        :error-messages="validationErrors.username"
        placeholder="Username or Email"
        required
        @input="$v.username.$touch"
      />
      <v-text-field
        type="password"
        v-model="userForm.password"
        :error-messages="validationErrors.password"
        placeholder="Password"
        required
        @input="$v.password.$touch"
      />
      <div class="d-flex mt-3" />
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import { useRoute, useRouter } from 'vue-router';
import AuthForm from '@/components/auth/AuthForm.vue';
import useUserModule from '@/store/user/module';

const { logIn, isAuthorised } = useUserModule();
const router = useRouter();
const route = useRoute();

const rules = {
  username: { required },
  password: { required },
};
const userForm = reactive({
  username: null,
  password: null,
});
const { $v, validationErrors } = useValidation(rules, userForm);
const emit = defineEmits(['successfulLogin']);

const redirect = () => {
  const { redirectFrom }: any = route.query;
  if (redirectFrom) {
    router.push(redirectFrom);
  }
};
const submit = async () => {
  const isValid = await $v.value.$validate();
  if (!isValid) {
    return;
  }
  await logIn(userForm);
  if (isAuthorised.value) {
    emit('successfulLogin');
    return redirect();
  }
};
</script>

<style lang="scss">
.login-form {
  .v-field__outline {
    color: $light-border;
  }
}
</style>

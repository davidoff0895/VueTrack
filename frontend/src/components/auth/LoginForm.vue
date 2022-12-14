<template>
  <AuthForm
    title="Log in to VueTrack"
    btn-text="Log in"
    @submit="submit"
  >
    <template #fields>
      <v-text-field
        v-model="user.username"
        :error-messages="validationErrors.username"
        placeholder="Username or Email"
        required
        @input="$v.username.$touch"
      />
      <v-text-field
        type="password"
        v-model="user.password"
        :error-messages="validationErrors.password"
        placeholder="Password"
        required
        @input="$v.password.$touch"
      />
      <div class="d-flex mt-3">
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
    </template>
  </AuthForm>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { required } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import { useRouter } from 'vue-router';
import AuthForm from '@/components/auth/AuthForm.vue';
import useUserModule from '@/store/user/module';

const { logIn } = useUserModule();

const rules = {
  username: { required },
  password: { required },
};

const user = reactive({
  username: null,
  password: null,
  isRemember: false,
});

const { $v, validationErrors } = useValidation(rules, user);
const router = useRouter();

const submit = async () => {
  const isValid = await $v.value.$validate();
  if (!isValid) {
    return;
  }
  await logIn(user);
  return router.back();
};
</script>

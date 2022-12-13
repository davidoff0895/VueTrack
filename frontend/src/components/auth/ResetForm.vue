<template>
  <AuthForm
    title="Reset password for VueTrack"
    btn-text="Reset password"
    :is-disabled="$v.$invalid"
    :btn-style="btnStyle"
    @submit="submit"
  >
    <template #fields>
      <v-text-field
        v-model="user.login"
        :error-messages="validationErrors.login"
        placeholder="Email"
        required
        @input="$v.login.$touch"
      />
    </template>
    <template #links>
      <router-link
        to="/auth/login"
        class="reset-form__link fz-14 ring-link d-block text-center mt-3"
      >
        Go back to login page
      </router-link>
    </template>
  </authform>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { required, email } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import { useRouter } from 'vue-router';
import AuthForm from '@/components/auth/AuthForm.vue';

const rules = {
  login: { required, email },
};

const user = reactive({
  login: null,
});

const { $v, validationErrors } = useValidation(rules, user);
const router = useRouter();

const btnStyle = computed(() => $v.value.$invalid ? 'outlined' : 'elevated');

const submit = async () => {
  const isValid = await $v.value.$validate();
  if (!isValid) {
    return;
  }
  return router.push('/auth');
};
</script>

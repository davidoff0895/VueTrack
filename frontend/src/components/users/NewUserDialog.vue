<template>
  <v-dialog
    v-model="isOpenedDialog"
    max-width="400"
    @click:outside="emit('close')"
  >
    <v-container
      fluid
    >
      <v-card class="pt-2 pl-3">
        <v-card-title class="text-h5 font-weight-bold">
          New user
        </v-card-title>
        <v-form @submit.prevent="submit">
          <v-card-text class="mt-8">
            <v-row>
              <v-col cols="5">
                <div class="fz-13">
                  Full Name
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  v-model="userForm.login"
                  :error-messages="validationErrors.login"
                  required
                  @input="$v.login.$touch"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <div class="fz-13">
                  Password
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  type="password"
                  v-model="userForm.password"
                  :error-messages="validationErrors.password"
                  required
                  @input="$v.password.$touch"
                  variant="outlined"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="5">
                <div class="fz-13">
                  Confirm
                </div>
              </v-col>
              <v-col cols="7">
                <v-text-field
                  type="password"
                  v-model="userForm.passwordRepeat"
                  :error-messages="validationErrors.passwordRepeat"
                  required
                  @input="$v.passwordRepeat.$touch"
                  variant="outlined"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn
              type="submit"
              color="primary"
              variant="flat"
              :disabled="$v.$invalid"
            >
              Create
            </v-btn>
            <v-btn
              variant="outlined"
              @click="emit('close')"
            >
              Cancel
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { required, minLength, sameAs, helpers } from '@vuelidate/validators';
import { useValidation } from '@/utils/validation';
import useUserModule from '@/store/user/module';

const emit = defineEmits(['close']);
const { createUser } = useUserModule();

const userForm = reactive({
  login: null,
  password: null,
  passwordRepeat: null,
});

const rules = {
  login: { required },
  password: { required, minLength: minLength(5) },
  passwordRepeat: {
    sameAs: helpers.withMessage(
      'Is not the same',
      sameAs(computed(()=> userForm.password))),
  },
};

const isOpenedDialog = ref(true);
const { $v, validationErrors } = useValidation(rules, userForm);

const submit = async () => {
  $v.value.$touch();
  if ($v.value.$invalid) {
    return;
  }
  const createdUser = await createUser(userForm);
  emit('close', createdUser);
};
</script>

<style lang="scss" scoped>

</style>

import useVuelidate, { ErrorObject } from '@vuelidate/core';
import { computed, reactive } from 'vue';

const getErrorMessages = (errors: ErrorObject[] = []) =>
  errors.map(({ $message }) => $message);

export const useValidation = (rules: any, fields: any) => {
  const $v = useVuelidate(rules, fields);
  const validationErrors = reactive(
    Object.keys(rules).reduce((errors: any, rule) => {
      errors[rule] = computed(() => getErrorMessages($v.value[rule].$errors));
      return errors;
    }, {}),
  );
  return {
    $v,
    validationErrors,
  };
};

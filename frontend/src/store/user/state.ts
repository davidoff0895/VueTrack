import { UserState } from '@/store/user/types';
import { reactive } from 'vue';

export const state: UserState = reactive({
  user: null,
  users: [],
  userError: null,
});

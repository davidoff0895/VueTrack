import { GlobalState } from '@/store/global/types';
import { reactive } from 'vue';

export const state: GlobalState = reactive({
  isLoading: false,
  isError: false,
});

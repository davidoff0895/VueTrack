import { GlobalModule } from '@/store/global/types';
import { state } from '@/store/global/state';
import { computed } from 'vue';

export default function useGlobalModule(): GlobalModule {
  const setLoader = (value) => state.isLoading = value;
  const setError = (value) => state.isError = value;

  return {
    isError: computed(() => state.isError),
    isLoading: computed(() => state.isLoading),
    setLoader,
    setError,
  };
}

import { UserModule } from '@/store/user/types';
import { state } from '@/store/user/state';
import { computed } from 'vue';
import { User } from '@/types/user/user';

export default function useUserModule(): UserModule {
  const setUser = (user: User) => state.user = user;

  return {
    user: computed(() => state.user),
    isAuthorised: computed(() => !!state.user),
    setUser,
  };
}

import { UserModule } from '@/store/user/types';
import { state } from '@/store/user/state';
import { computed } from 'vue';
import { User } from '@/types/user/user';
import { UsersService } from '@/services/users';

export default function useUserModule(): UserModule {
  const logIn = async (user) => {
    await new UsersService().logIn(user);
  };
  const getUser = async () => {
    const user = await new UsersService().getUser();
    setUser(user);
    return user;
  };

  const setUser = (user: User) => state.user = user;

  return {
    user: computed(() => state.user),
    isAuthorised: computed(() => !!state.user),
    getUser,
    setUser,
    logIn,
  };
}

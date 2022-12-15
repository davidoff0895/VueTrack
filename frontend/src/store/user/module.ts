import { UserModule } from '@/store/user/types';
import { state } from '@/store/user/state';
import { computed } from 'vue';
import { User } from '@/types/user/user';
import { UsersService } from '@/services/users';

export default function useUserModule(): UserModule {
  const logIn = async (userForm: {username: string, password: string}) => {
    try {
      state.userError = null;
      const user = await new UsersService().logIn(userForm);
      setUser(user);
    } catch (e: any) {
      state.userError = e.response.data;
    }
  };
  const logOut = async () => {
    await new UsersService().logOut();
    setUser(null);
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
    userError: computed(() => state.userError),
    getUser,
    logIn,
    logOut,
  };
}

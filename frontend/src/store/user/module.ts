import { UserModule } from '@/store/user/types';
import { state } from '@/store/user/state';
import { computed } from 'vue';
import { CreateUser, User } from '@/types/user/user';
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
  const createUser = (newUser: CreateUser) => {
      return new UsersService().createUser(newUser);
  };
  const deleteUser = (id: string, user: User) => {
      return new UsersService().deleteUser(id, user);
  };
  const getUsers = async () => {
    state.users = await new UsersService().getUsers({
      offset: 0, limit: 50,
    });
    return state.users;
  };

  const setUser = (user: User) => state.user = user;

  return {
    user: computed(() => state.user),
    users: computed(() => state.users),
    isAuthorised: computed(() => !!state.user),
    userError: computed(() => state.userError),
    getUser,
    getUsers,
    logIn,
    logOut,
    createUser,
    deleteUser,
  };
}

import { User } from '@/types/user/user';
import { ComputedRef } from 'vue';

export interface UserState {
  user: User
}

export interface UserModule {
  user: ComputedRef<User>
  isAuthorised: ComputedRef<boolean>
  setUser: (user: User) => void
}

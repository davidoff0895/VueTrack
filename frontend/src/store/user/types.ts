import { User } from '@/types/user/user';
import { ComputedRef } from 'vue';

export interface UserState {
  user: User
}

export interface UserModule {
  user: ComputedRef<User>
  isAuthorised: ComputedRef<boolean>
  getUser(): Promise<User>
  setUser: (user: User) => void
  logIn: (username: string, password: string) => void
}

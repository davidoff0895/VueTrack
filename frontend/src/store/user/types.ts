import { User } from '@/types/user/user';
import { ComputedRef } from 'vue';

export interface UserState {
  user: User
  userError: any
}

export interface UserModule {
  user: ComputedRef<User>
  userError: ComputedRef<any>
  isAuthorised: ComputedRef<boolean>
  getUser(): Promise<User>
  getUsers(): Promise<User[]>
  logIn(user: {username: string, password: string}): Promise<void>
  logOut(): Promise<void>
}

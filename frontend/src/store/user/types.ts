import { CreateUser, User } from '@/types/user/user';
import { ComputedRef } from 'vue';

export interface UserState {
  user: User
  users: User[]
  userError: any
}

export interface UserModule {
  user: ComputedRef<User>
  users: ComputedRef<User[]>
  userError: ComputedRef<any>
  isAuthorised: ComputedRef<boolean>
  getUser(): Promise<User>
  getUsers(): Promise<User[]>
  logIn(user: {username: string, password: string}): Promise<void>
  logOut(): Promise<void>
  createUser(user: CreateUser): Promise<User>
  deleteUser(id: string, user: User): Promise<string>
}

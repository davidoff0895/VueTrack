import { User } from '@/types/user/user';

export interface UsersServiceInterface {
  logIn(username: string, password: string): Promise<User>
  logOut(): Promise<void>
  getUser(): Promise<User>
  getUsers({ offset, limit }): Promise<User[]>
}

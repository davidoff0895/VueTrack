import { User } from '@/types/user/user';

export interface UsersServiceInterface {
  logIn(username: string, password: string): Promise<User>
  getUser(): Promise<User>
}

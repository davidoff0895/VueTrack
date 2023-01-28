import { CreateUser, User } from '@/types/user/user';

export interface UsersServiceInterface {
  logIn(username: string, password: string): Promise<User>
  logOut(): Promise<void>
  getUser(): Promise<User>
  getUsers({ offset, limit }): Promise<User[]>
  createUser(user: CreateUser): Promise<User>
  deleteUser(id: string, user: User): Promise<string>
}

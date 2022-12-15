import { Api } from '@/api';
import { UsersServiceInterface } from '@/services/users/types';
import { User } from '@/types/user/user';
import { getServiceConfig } from '@/services/getServiceConfig';

export class UsersService implements UsersServiceInterface {
  private MODULE_PREFIX = 'user';
  private provider: Api

  constructor() {
    this.provider = new Api(getServiceConfig(this.MODULE_PREFIX));
  }

  logIn(user): Promise<User> {
    return this.provider.post('/login', user);
  }
  logOut(): Promise<void> {
    return this.provider.post('/logout');
  }
  getUser(): Promise<User> {
    return this.provider.get('/me');
  }
}

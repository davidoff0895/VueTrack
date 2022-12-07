import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from '@/user/entities/user.entity';
import { AuthErrors } from '@/auth/const/authStatuses';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.getValidUser(username);
    const passportValid = await bcrypt.compare(password, user.password);
    if (passportValid) {
      return user;
    }
    throw new NotAcceptableException(AuthErrors.PASSWORD);
  }
  private async getValidUser(username: string): Promise<User> {
    const user = await this.userService.getUser(username);
    if (!user) {
      throw new NotAcceptableException(AuthErrors.LOGIN);
    }
    return user;
  }
}

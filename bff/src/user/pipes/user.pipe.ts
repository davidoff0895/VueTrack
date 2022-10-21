import {
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateUserDto } from '@/user/dto/create-user.dto';
import { UserErrors } from '@/user/const/userStatuses';

@Injectable()
export class UserPipe implements PipeTransform {
  async transform(user: CreateUserDto) {
    if (user.password !== user.passwordRepeat) {
      throw new HttpException(UserErrors.PASSWORD, HttpStatus.UNAUTHORIZED);
    }
    if (user.login === user.password) {
      throw new HttpException(
        UserErrors.LOGIN_AND_PASSWORD,
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}

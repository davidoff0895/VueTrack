import { UserErrorCodes } from '@/user/errors/errorCodes';
import { ConflictException } from '@nestjs/common';

export class UserErrorHandler extends Error {
  constructor(e) {
    super();
    if (e.code === UserErrorCodes.DUPLICATE_ERROR) {
      throw new ConflictException(`User ${e.keyValue.login} already exists`);
    }
  }
}

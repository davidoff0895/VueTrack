import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export interface UserDto {
  id: string;
  name: string;
  login: string;
  avatar: string;
  requiredTwoFactorAuthentication: boolean;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(5)
  readonly password: string;

  @ApiProperty()
  @Length(5)
  readonly passwordRepeat: string;
}

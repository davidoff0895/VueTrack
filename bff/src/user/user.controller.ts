import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
} from '@nestjs/common';
import {
  CreateUserDto,
  mapUserToDto,
  UserDto,
} from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { UserPipe } from '@/user/pipes/user.pipe';
import { LocalAuthGuard } from '@/auth/local.auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/new')
  @UsePipes(new UserPipe())
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req): UserDto {
    return mapUserToDto(req.user);
  }
}

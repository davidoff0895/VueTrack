import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Get,
} from '@nestjs/common';
import {
  CreateUserDto,
  mapUserToDto,
  UserDto,
} from '@/user/dto/create-user.dto';
import { UserService } from '@/user/user.service';
import { UserPipe } from '@/user/pipes/user.pipe';
import { LocalAuthGuard } from '@/auth/local.auth.guard';
import { AuthenticatedGuard } from '@/auth/authenticated.guard';

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

  @UseGuards(AuthenticatedGuard)
  @Get('/protected')
  getHello(@Request() req): string {
    return req.user;
  }

  @Post('/logout')
  logout(@Request() req): any {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }
}

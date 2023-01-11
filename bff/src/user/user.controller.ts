import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  Request,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto, UserDto } from '@/user/dto/create-user.dto';
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
    return req.user.userInfo;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/me')
  getMyUser(@Request() req): UserDto {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/list')
  getUsers(@Request() req) {
    return this.userService.getUsers(req.query);
  }

  @Post('/logout')
  logout(@Request() req) {
    req.session.destroy();
    return { msg: 'The user session has ended' };
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.userService.remove(id);
    return { msg: `The user #${id} was removed successfully` };
  }
}

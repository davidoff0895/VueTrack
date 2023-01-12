import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/user/entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '@/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '@/common/dto/pagination.dto';
import { UserErrors } from '@/user/const/userStatuses';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  async getUsers({ offset, limit }: PaginationDto): Promise<UserDto[]> {
    if (!(offset >= 0 && limit)) {
      throw new BadRequestException(`Incorrect offset or limit parameter`);
    }
    const users = await this.userModel.find().skip(offset).limit(limit).exec();
    return users.map(({ userInfo }) => userInfo);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  async getUser(login: string): Promise<User> {
    login = login.toLowerCase();
    return this.userModel.findOne({ login });
  }
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existedUser = await this.getUser(createUserDto.login);
    if (existedUser) {
      throw new ConflictException(UserErrors.LOGIN);
    }
    const user = new this.userModel({
      login: createUserDto.login,
      name: createUserDto.login,
      password: await UserService.getHashPassword(createUserDto.password),
      avatar: createUserDto.login,
      requiredTwoFactorAuthentication: false,
    });
    const newUser = await user.save();
    return newUser.userInfo;
  }
  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  private static async getHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }
}

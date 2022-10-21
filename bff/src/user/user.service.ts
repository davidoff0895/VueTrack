import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@/user/entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '@/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { PaginationDto } from '@/common/dto/pagination.dto';
import userConfiguration from '@/user/config/user.config';
import { ConfigType } from '@nestjs/config';
import { UserErrors } from '@/user/const/userStatuses';

@Injectable()
export class UserService {
  public readonly AVATAR_URL: string;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    @Inject(userConfiguration.KEY)
    private userConfig: ConfigType<typeof userConfiguration>,
  ) {
    this.AVATAR_URL = userConfig.avatarUrl;
  }
  async getUsers({ offset, limit }: PaginationDto): Promise<User[]> {
    return this.userModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }
  async getUser(id: string): Promise<UserDto> {
    const user = await this.findOne(id);
    return UserService.mapUserToDto(user);
  }
  async create(createUserDto: CreateUserDto): Promise<UserDto> {
    const existedUser = await this.userModel
      .findOne({ login: createUserDto.login })
      .exec();
    if (existedUser) {
      throw new ConflictException(UserErrors.LOGIN);
    }
    const user = new this.userModel({
      login: createUserDto.login,
      name: createUserDto.login,
      password: await UserService.getHashPassword(createUserDto.password),
      avatar: this.generateAvatar(createUserDto.login),
      requiredTwoFactorAuthentication: false,
    });
    const newUser = await user.save();
    return UserService.mapUserToDto(newUser);
  }
  async remove(id: string) {
    const user = await this.findOne(id);
    return user.remove();
  }

  private static async getHashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  private generateAvatar(userName: string): string {
    return `${this.AVATAR_URL}?username=${userName}`;
  }

  private static mapUserToDto(user: User): UserDto {
    return {
      id: user._id,
      name: user.name,
      login: user.login,
      avatar: user.avatar,
      requiredTwoFactorAuthentication: user.requiredTwoFactorAuthentication,
    };
  }
}

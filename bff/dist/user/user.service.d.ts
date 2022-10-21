import { User } from '@/user/entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto, UserDto } from '@/user/dto/create-user.dto';
import { PaginationDto } from '@/dto/pagination.dto';
import userConfiguration from '@/user/config/user.config';
import { ConfigType } from '@nestjs/config';
export declare class UserService {
    private readonly userModel;
    private userConfig;
    readonly AVATAR_URL: string;
    constructor(userModel: Model<User>, userConfig: ConfigType<typeof userConfiguration>);
    getUsers({ offset, limit }: PaginationDto): Promise<User[]>;
    findOne(id: string): Promise<User>;
    getUser(id: string): Promise<UserDto>;
    create(createUserDto: CreateUserDto): Promise<UserDto>;
    remove(id: string): Promise<User>;
    private static getHashPassword;
    private generateAvatar;
    private static mapUserToDto;
}

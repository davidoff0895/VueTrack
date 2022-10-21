import { PipeTransform } from '@nestjs/common';
import { CreateUserDto } from '@/user/dto/create-user.dto';
export declare class UserPipe implements PipeTransform {
    transform(user: CreateUserDto): Promise<CreateUserDto>;
}

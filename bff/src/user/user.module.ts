import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/entities/user.entity';
import { UserController } from '@/user/user.controller';
import userConfig from '@/user/config/user.config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    ConfigModule.forFeature(userConfig),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}

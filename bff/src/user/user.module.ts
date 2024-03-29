import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserService } from '@/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@/user/entities/user.entity';
import { UserController } from '@/user/user.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

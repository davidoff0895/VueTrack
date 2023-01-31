import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '@/user/dto/create-user.dto';
import { avatarUrl } from '@/user/const/userConfig';
import { UserErrorHandler } from '@/user/errors/errorHandler';

@Schema({
  timestamps: true,
  virtuals: {
    userInfo: {
      get() {
        return {
          id: this._id,
          login: this.login,
          avatar: `${avatarUrl}${this.login}`,
          requiredTwoFactorAuthentication: this.requiredTwoFactorAuthentication,
          createdAt: this.createdAt,
        };
      },
    },
  },
})
export class User extends Document {
  @Prop({
    type: String,
    lowercase: true,
    unique: true,
  })
  login: string;
  @Prop({
    type: String,
    required: true,
  })
  password: string;
  @Prop()
  requiredTwoFactorAuthentication: boolean;
  userInfo: UserDto;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.post('save', (error, doc, next) => {
  if (error) {
    new UserErrorHandler(error);
  } else {
    next();
  }
});

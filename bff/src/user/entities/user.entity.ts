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
          name: this.name,
          login: this.login,
          avatar: this.avatar,
          requiredTwoFactorAuthentication: this.requiredTwoFactorAuthentication,
          createdAt: this.createdAt,
        };
      },
    },
  },
})
export class User extends Document {
  @Prop()
  name: string;
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
  @Prop({
    type: String,
    lowercase: true,
    set: (v) => `${avatarUrl}${v}`,
  })
  avatar: string;
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

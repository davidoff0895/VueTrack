import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserDto } from '@/user/dto/create-user.dto';

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
  })
  login: string;
  @Prop()
  password: string;
  @Prop()
  avatar: string;
  @Prop()
  requiredTwoFactorAuthentication: boolean;
  userInfo: UserDto;
}

export const UserSchema = SchemaFactory.createForClass(User);

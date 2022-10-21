import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  login: string;
  @Prop()
  password: string;
  @Prop()
  avatar: string;
  @Prop()
  requiredTwoFactorAuthentication: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

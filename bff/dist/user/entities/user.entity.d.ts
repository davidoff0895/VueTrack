import { Document } from 'mongoose';
export declare class User extends Document {
    name: string;
    login: string;
    password: string;
    avatar: string;
    requiredTwoFactorAuthentication: boolean;
}
export declare const UserSchema: any;

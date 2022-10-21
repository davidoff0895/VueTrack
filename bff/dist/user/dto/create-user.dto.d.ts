export interface UserDto {
    id: string;
    name: string;
    login: string;
    avatar: string;
    requiredTwoFactorAuthentication: boolean;
}
export declare class CreateUserDto {
    readonly login: string;
    readonly password: string;
    readonly passwordRepeat: string;
}

export interface User {
  id: string;
  login: string;
  avatar: string;
  createdAt: Date;
  requiredTwoFactorAuthentication: boolean;
}
export interface CreateUser {
  username: string
  password: string
  rePassword: string
}

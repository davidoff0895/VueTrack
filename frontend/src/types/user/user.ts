export interface User {
  id: string;
  name: string;
  login: string;
  avatar: string;
  createdAt: string;
  requiredTwoFactorAuthentication: boolean;
}

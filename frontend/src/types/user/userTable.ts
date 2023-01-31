import { User } from '@/types/user/user';

export interface UserTable extends User {
  isChecked: boolean
  registrationDate: string
  profileLink: string,
}

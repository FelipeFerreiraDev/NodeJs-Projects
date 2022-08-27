import { SessionUserDto } from './session-user.dto';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  id?: number;
  token?: SessionUserDto;
}

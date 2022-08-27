import { Schema } from 'mongoose';
import { SessionUserDto } from '../dto/session-user.dto';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

export class User {
  id?: number;

  name: string;

  email: string;

  password: string;

  token?: SessionUserDto;
}

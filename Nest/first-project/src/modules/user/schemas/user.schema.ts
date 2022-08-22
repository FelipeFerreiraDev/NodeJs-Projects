import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export class User {
  name: string;

  email: string;

  password: string;

  id?: number;
}

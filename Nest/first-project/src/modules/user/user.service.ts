import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { hash, compare } from 'bcryptjs';
import auth from 'src/config/auth';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userSchema: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    const passwordHash = await hash(password, 8);

    const user = {
      name,
      email,
      password: passwordHash,
    };

    const userReturn = await new this.userSchema(user).save();

    return userReturn;
  }

  async findAll() {
    return this.userSchema.find().exec();
  }

  findId(id: string) {
    return this.userSchema.findById(id).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    /* update user*/
    if (updateUserDto.password) {
      updateUserDto.password = await hash(updateUserDto.password, 8);
    }

    return this.userSchema.updateOne({ _id: id }, { $set: updateUserDto });
  }

  remove(id: string) {
    return this.userSchema.deleteOne({ _id: id }).exec();
  }

  async login(email: string, password: string) {
    const user = await this.userSchema.find({ email }).exec();

    const { secret_token, expires_in_refresh_token, secret_refresh_token } =
      auth;

    if (!user) {
      return { error: 'User not found' };
    }

    const passwordMatch = await compare(password, user[0].password);

    if (!passwordMatch) {
      return { error: 'Invalid password' };
    }

    const token = sign({}, secret_token, {
      subject: user[0]._id.toString(),

      expiresIn: expires_in_refresh_token,
    });

    await this.userSchema.updateOne({ token });

    return token;
  }
}

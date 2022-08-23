import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import { hash } from 'bcryptjs';

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

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

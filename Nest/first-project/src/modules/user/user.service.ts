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

  async findAll() {
    return this.userSchema.find().exec();
  }

  findId(id: string) {
    return this.userSchema.findById(id).exec();
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    /* update user*/
    return this.userSchema.updateOne({ _id: id }, { $set: updateUserDto });
  }

  remove(id: string) {
    return this.userSchema.deleteOne({ _id: id }).exec();
  }
}

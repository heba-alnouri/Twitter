import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser?.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  remove(userId: mongoose.Types.ObjectId) {
    return this.userModel.findByIdAndDelete(userId);
  }

  update(updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(updateUserDto);
  }

  updateImage(updateUserDto: UpdateUserDto) {
    this.userModel.findByIdAndUpdate(updateUserDto);
  }
}

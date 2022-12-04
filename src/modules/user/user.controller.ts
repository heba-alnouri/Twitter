import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Patch,
  Param,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose from 'mongoose';
import { IDValidationPipe } from 'src/shared/error-handling/validation-middleware';
import { LoggingInterceptor } from 'src/shared/decorators/intercepter/LoggingIntercepter.interceptor';

@Controller('user')
@UseInterceptors(new LoggingInterceptor())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Put()
  update(@Body(IDValidationPipe) updateUserDTO: UpdateUserDto) {
    return this.userService.update(updateUserDTO);
  }

  @Patch(':userId')
  updateImage(@Body(IDValidationPipe) updateUserDTO: UpdateUserDto) {
    return this.userService.update(updateUserDTO);
  }

  @Delete(':userID')
  delete(@Param('userID', IDValidationPipe) userId: mongoose.Types.ObjectId) {
    return this.userService.remove(userId);
  }
}

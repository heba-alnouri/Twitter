import { Image } from 'src/shared/interfaces/media.interface';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
export class CreateUserDto {
  @IsString()
  @IsEmail({
    message: i18nValidationMessage('userValidation.userValidation.email'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(
      'userValidation.userValidation.notEmpty.email',
    ),
  })
  @Length(3, 30, {
    message: i18nValidationMessage(
      'userValidation.userValidation.length.email',
    ),
  })
  email: string;

  @IsString()
  @Length(8, 30, {
    message: i18nValidationMessage(
      'userValidation.userValidation.length.password',
    ),
  })
  @IsNotEmpty({
    message: i18nValidationMessage(
      'userValidation.userValidation.notEmpty.password',
    ),
  })
  password: string;

  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage(
      'userValidation.userValidation.notEmpty.firstName',
    ),
  })
  @Length(3, 30, {
    message: i18nValidationMessage(
      'userValidation.userValidation.length.firstName',
    ),
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage(
      'userValidation.userValidation.notEmpty.lastName',
    ),
  })
  @Length(3, 30, {
    message: i18nValidationMessage(
      'userValidation.userValidation.length.lastName',
    ),
  })
  lastName: string;

  @IsOptional()
  @Type(() => Image)
  profileImage?: Image;

  @IsOptional()
  @Type(() => Image)
  coverImage?: Image;
}

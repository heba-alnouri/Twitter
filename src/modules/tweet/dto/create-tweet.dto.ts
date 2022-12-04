import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';
import { i18nValidationMessage } from 'nestjs-i18n';
import { User } from 'src/modules/user/entities/user.entity';
import { Image, Video } from 'src/shared/interfaces/media.interface';
import { Tweet } from '../entities/tweet.entity';

export class CreateTweetDto {
  @IsString()
  @IsNotEmpty({
    message: i18nValidationMessage(
      'validation.tweetValidation.notEmpty.tweetContent',
    ),
  })
  tweetContent: string;

  @IsArray()
  @IsOptional()
  @Type(() => mongoose.Schema.Types.ObjectId)
  mentions: User[];

  @IsArray()
  @Type(() => Image)
  @IsOptional()
  image?: Image[];

  @IsArray()
  @Type(() => Video)
  @IsOptional()
  video?: Video[];
}

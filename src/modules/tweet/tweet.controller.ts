import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Put,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  Bind,
} from '@nestjs/common';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import mongoose from 'mongoose';
import { IDValidationPipe } from 'src/shared/error-handling/validation-middleware';

@Controller('tweet')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @Post()
  create(@Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto);
  }

  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @Delete(':tweetID')
  remove(@Param('tweetID', IDValidationPipe) tweetID: mongoose.Types.ObjectId) {
    return this.tweetService.remove(tweetID);
  }

  @Put(':tweetID')
  update(
    @Param('tweetID', IDValidationPipe) tweetID: mongoose.Types.ObjectId,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(tweetID, updateTweetDto);
  }

  @Patch()
  reply(
    @Param('tweetID', IDValidationPipe) tweetId: mongoose.Types.ObjectId,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(tweetId, updateTweetDto);
  }

  @Patch()
  updateImage(
    @Param('tweetID', IDValidationPipe) tweetId: mongoose.Types.ObjectId,
    @Body() updateTweetDto: UpdateTweetDto,
  ) {
    return this.tweetService.update(tweetId, updateTweetDto);
  }
}

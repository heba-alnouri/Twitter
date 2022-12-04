import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { i18nValidationMessage } from 'nestjs-i18n';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { UpdateTweetDto } from './dto/update-tweet.dto';
import { Tweet, TweetDocument } from './entities/tweet.entity';

@Injectable()
export class TweetService {
  constructor(@InjectModel('Tweet') private tweetModel: Model<TweetDocument>) {}

  create(CreateTweetDto: CreateTweetDto): Promise<Tweet> {
    const newTweet = new this.tweetModel(CreateTweetDto);
    return newTweet.save();
  }

  async findTweet(tweetId: mongoose.Schema.Types.ObjectId): Promise<Tweet> {
    return this.tweetModel.findById(tweetId);
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetModel.find();
  }

  async remove(tweetID: mongoose.Types.ObjectId) {
    const isValidTweetID = mongoose.Types.ObjectId.isValid(tweetID);
    if (isValidTweetID) {
      await this.tweetModel.findByIdAndDelete(tweetID);
    } else {
      return i18nValidationMessage('validation.tweetValidation.tweetId');
    }
  }

  async update(
    tweetID: mongoose.Types.ObjectId,
    updateTweetDto: UpdateTweetDto,
  ) {
    const isValidTweetID = mongoose.Types.ObjectId.isValid(tweetID);
    if (isValidTweetID) {
      await this.tweetModel.findByIdAndUpdate(tweetID, updateTweetDto);
    } else {
      return i18nValidationMessage('validation.tweetValidation.tweetId');
    }
  }

  updateImage(
    tweetID: mongoose.Types.ObjectId,
    updateTweetDto: UpdateTweetDto,
  ) {
    this.tweetModel.findByIdAndUpdate(tweetID, updateTweetDto);
  }
}

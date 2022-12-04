import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TweetSchema } from './entities/tweet.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Tweet', schema: TweetSchema }]),
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}

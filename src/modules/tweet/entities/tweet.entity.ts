import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/modules/user/entities/user.entity';
import { Image, Video } from 'src/shared/interfaces/media.interface';

export type TweetDocument = HydratedDocument<Tweet>;

@Schema()
export class Tweet {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;

  @Prop({
    type: String,
    required: [true, 'Tweet content is required.'],
    minlength: 1,
    maxlength: 128,
  })
  tweetContent: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  })
  retweet: Tweet[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  likes: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  })
  mentions: User[];

  @Prop({
    type: [
      {
        url: String,
        filename: String,
      },
    ],
  })
  images: Image[];

  @Prop({
    type: [
      {
        url: String,
        filename: String,
      },
    ],
  })
  video: Video[];
}

export const TweetSchema = SchemaFactory.createForClass(Tweet);

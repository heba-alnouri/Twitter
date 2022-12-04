import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Tweet } from 'src/modules/tweet/entities/tweet.entity';
import { Image } from 'src/shared/interfaces/media.interface';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({
    type: String,
    required: [true, 'first is missing.'],
    minlength: 1,
    maxlength: 30,
  })
  firstName: string;

  @Prop({
    type: String,
    required: [true, 'last is missing.'],
    minlength: 1,
    maxlength: 30,
  })
  lastName: string;

  @Prop({
    type: String,
    required: [true, 'email is missing.'],
    minlength: 3,
    maxlength: 30,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'password is missing.'],
    minlength: 8,
    maxlength: 50,
  })
  password: string;

  @Prop({
    type: {
      url: String,
      filename: String,
    },
  })
  profileImage?: Image;

  @Prop({
    type: {
      url: String,
      filename: String,
    },
  })
  coverImage?: Image;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }] })
  likedTweets?: Tweet[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }] })
  tweets?: Tweet[];

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }] })
  repliesTweets?: Tweet[];
}

export const UserSchema = SchemaFactory.createForClass(User);

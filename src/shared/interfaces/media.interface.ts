import { IsString, IsUrl } from 'class-validator';

export class Image {
  @IsUrl()
  url: string;
  @IsString()
  fileName: string;
}

export class Video {
  @IsUrl()
  url: string;
  @IsString()
  fileName: string;
}

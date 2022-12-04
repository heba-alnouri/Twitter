import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class IDValidationPipe implements PipeTransform {
  transform(documentId: mongoose.Schema.Types.ObjectId) {
    if (!mongoose.isValidObjectId(documentId)) {
      throw new HttpException(
        `common.documentId.notValid`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return documentId;
  }
}

import { HttpException, HttpStatus } from '@nestjs/common';

export function emptyDocument<T>(document: T, name: string): void {
  if (!document || (document as T[])?.length < 1) {
    throw new HttpException(`${name} not Found`, HttpStatus.BAD_REQUEST);
  }
}

import { HttpException } from '@nestjs/common';
import { NOT_FOUND_EXCEPTION_RESPONSE } from '../responses/not-found.response';

export class NotFoundException extends HttpException {
  constructor() {
    super(
      NOT_FOUND_EXCEPTION_RESPONSE.description,
      NOT_FOUND_EXCEPTION_RESPONSE.status
    );
  }
}

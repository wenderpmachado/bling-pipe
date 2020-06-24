import { HttpException } from '@nestjs/common';
import { NO_CONTENT_EXCEPTION_RESPONSE } from './../responses/no-content.response';

export class NoContentException extends HttpException {
  constructor() {
    super(
      NO_CONTENT_EXCEPTION_RESPONSE.description,
      NO_CONTENT_EXCEPTION_RESPONSE.status
    );
  }
}

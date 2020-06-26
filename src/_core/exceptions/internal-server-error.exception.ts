import { HttpException } from '@nestjs/common';
import { INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE } from '../responses/internal-server-error.response';

export class InternalServerErrorException extends HttpException {
  constructor(error?: string) {
    let description = INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE.description;

    if (error) {
      description += `. ${error}`;
    }

    super(
      description,
      INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE.status
    );
  }
}

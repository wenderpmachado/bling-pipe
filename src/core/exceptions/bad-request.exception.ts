import { HttpException } from '@nestjs/common';
import { EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE } from './../responses/bad-request.response';

export class ExternalBadRequestException extends HttpException {
  constructor(externalServiceName: string) {
    super(
      EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE.description + ' ' + externalServiceName,
      EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE.status
    );
  }
}

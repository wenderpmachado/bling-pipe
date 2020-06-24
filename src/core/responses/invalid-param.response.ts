import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from '../responses/status-response.interface';

export const INVALID_PARAM_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Parametro possui valor inválido',
  status: HttpStatus.UNPROCESSABLE_ENTITY
}

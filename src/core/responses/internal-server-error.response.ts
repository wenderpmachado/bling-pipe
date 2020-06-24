import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from './status-response.interface';

export const INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Erro interno ao realizar operação',
  status: HttpStatus.INTERNAL_SERVER_ERROR
}

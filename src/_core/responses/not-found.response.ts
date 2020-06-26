import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from './status-response.interface';

export const NOT_FOUND_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Registro não encontrado',
  status: HttpStatus.NOT_FOUND
}

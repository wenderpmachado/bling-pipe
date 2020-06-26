import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from './status-response.interface';

export const NO_CONTENT_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Nenhum registro encontrado',
  status: HttpStatus.NO_CONTENT
}

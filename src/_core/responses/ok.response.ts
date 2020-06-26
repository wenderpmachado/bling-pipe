import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from './status-response.interface';

export const OK_RESPONSE: IStatusResponse = {
  description: 'Requisição realizada com sucesso',
  status: HttpStatus.OK
}

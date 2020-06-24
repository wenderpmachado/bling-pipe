import { HttpStatus } from '@nestjs/common';
import { IStatusResponse } from './status-response.interface';

export const EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Erro ao realizar requisição para o serviço',
  status: HttpStatus.BAD_REQUEST
}

export const BAD_REQUEST_EXCEPTION_RESPONSE: IStatusResponse = {
  description: 'Erro ao realizar requisição',
  status: HttpStatus.BAD_REQUEST
}

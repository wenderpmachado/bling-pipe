import { HttpException } from '@nestjs/common';
import { INVALID_PARAM_EXCEPTION_RESPONSE } from '../responses/invalid-param.response';

export class InvalidParamException extends HttpException {
  constructor(param: string, values?: string) {
    let description = INVALID_PARAM_EXCEPTION_RESPONSE.description + `. Parametro: ${param}.`

    if (values && values.length > 0) {
      description += ` Valores permitidos: ${values}`
    }

    super(
      description,
      INVALID_PARAM_EXCEPTION_RESPONSE.status
    );
  }
}

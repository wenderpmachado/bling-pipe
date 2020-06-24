import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { INVALID_PARAM_EXCEPTION_RESPONSE } from '../core/responses/invalid-param.response';

import { NoContentException } from '../core/exceptions/no-content.exception';
import { ExternalBadRequestException } from '../core/exceptions/bad-request.exception';
import { InternalServerErrorException } from '../core/exceptions/internal-server-error.exception';
import { InvalidParamException } from '../core/exceptions/invalid-param.exception';
import { EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE } from '../core/responses/bad-request.response';
import { INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE } from '../core/responses/internal-server-error.response';
import { NO_CONTENT_EXCEPTION_RESPONSE } from '../core/responses/no-content.response';
import { OK_RESPONSE } from '../core/responses/ok.response';
import {
  IsAPipedriveStatusOption,
  PIPEDRIVE_STATUS,
  PIPEDRIVE_STATUS_OPTIONS,
  PIPEDRIVE_STATUS_TYPE,
} from './pipedrive-status.type';
import { PipedriveService } from './pipedrive.service';

@Controller('pipedrive')
export class PipedriveController {
  constructor(private pipedriveService: PipedriveService) {}

  @Get()
  @ApiResponse({ ...OK_RESPONSE })
  @ApiResponse({ ...INVALID_PARAM_EXCEPTION_RESPONSE })
  @ApiResponse({ ...NO_CONTENT_EXCEPTION_RESPONSE })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  @ApiQuery({
    name: 'status',
    required: false,
    example: PIPEDRIVE_STATUS.WON,
    description: 'Status do negócio',
    enum: PIPEDRIVE_STATUS,
  })
  async findOpportunities(@Query('status') status: PIPEDRIVE_STATUS_TYPE): Promise<any> {
    try {
      if (status && !IsAPipedriveStatusOption(status)) {
        throw new InvalidParamException('status', PIPEDRIVE_STATUS_OPTIONS.join(', '));
      }

      const result = await this.pipedriveService.findOpportunities(status);

      if (result.status !== HttpStatus.OK) {
        throw new ExternalBadRequestException('Pipedrive');
      }

      const { data } = result.data;

      if (!data || data.length === 0) {
        throw new NoContentException();
      }

      return data;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException();
      }

      throw error;
    }
  }
}

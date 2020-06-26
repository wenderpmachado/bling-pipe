import { IDeal, IDealUpdate } from './deal.interface';
import { Controller, Get, HttpStatus, Query, Post, Body } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiBody, ApiExcludeEndpoint, ApiOperation, ApiTags } from '@nestjs/swagger';

import { ExternalBadRequestException } from '../core/exceptions/bad-request.exception';
import { InternalServerErrorException } from '../core/exceptions/internal-server-error.exception';
import { InvalidParamException } from '../core/exceptions/invalid-param.exception';
import { NoContentException } from '../core/exceptions/no-content.exception';
import { EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE } from '../core/responses/bad-request.response';
import { INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE } from '../core/responses/internal-server-error.response';
import { INVALID_PARAM_EXCEPTION_RESPONSE } from '../core/responses/invalid-param.response';
import { NO_CONTENT_EXCEPTION_RESPONSE } from '../core/responses/no-content.response';
import { OK_RESPONSE } from '../core/responses/ok.response';
import { BlingService } from './../bling/bling.service';
import { ExtractDealObject } from './helpers/extract-deal-object.helper';
import {
  IsAPipedriveDealStatusOption,
  PIPEDRIVE_DEAL_STATUS,
  PIPEDRIVE_DEAL_STATUS_OPTIONS,
  PIPEDRIVE_DEAL_STATUS_TYPE,
} from './pipedrive-status.type';
import { PipedriveService } from './pipedrive.service';

@ApiTags('Pipedrive')
@Controller('pipedrive/deals')
export class PipedriveController {
  constructor(
    private pipedriveService: PipedriveService,
    private blingService: BlingService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as ofertas (ganhas) do Pipedrive' })
  @ApiResponse({ ...OK_RESPONSE })
  @ApiResponse({ ...INVALID_PARAM_EXCEPTION_RESPONSE })
  @ApiResponse({ ...NO_CONTENT_EXCEPTION_RESPONSE })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  @ApiQuery({
    name: 'status',
    required: false,
    example: PIPEDRIVE_DEAL_STATUS.WON,
    description: 'Status do acordo',
    enum: PIPEDRIVE_DEAL_STATUS,
  })
  async findDeals(@Query('status') status?: PIPEDRIVE_DEAL_STATUS_TYPE): Promise<IDeal[]> {
    try {
      if (status && !IsAPipedriveDealStatusOption(status)) {
        throw new InvalidParamException('status', PIPEDRIVE_DEAL_STATUS_OPTIONS.join(', '));
      }

      const result = await this.pipedriveService.findDeals(status);

      if (result.status !== HttpStatus.OK) {
        throw new ExternalBadRequestException('Pipedrive');
      }

      const { data } = result.data;

      if (!data || data.length === 0) {
        throw new NoContentException();
      }

      const extractedObjects: IDeal[] = data.map(deal => ExtractDealObject(deal));

      return extractedObjects
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }

  @Post('sync')
  @ApiOperation({ summary: 'Sincronizar todas as ofertas ganhas do Pipedrive' })
  @ApiResponse({ ...OK_RESPONSE })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  async syncWonDeal(): Promise<boolean> {
    try {
      const deals = await this.findDeals();

      for (const deal of deals) {
        await this.createDeal(deal);
      }

      return true;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }

  @Post('webhook')
  @ApiExcludeEndpoint()
  async createDealHook(@Body() updatedDeal: IDealUpdate): Promise<any> {
    try {
      if (!updatedDeal || !updatedDeal.current) {
        throw new InvalidParamException('deal');
      }

      const { current: deal } = updatedDeal;

      if (deal.status !== PIPEDRIVE_DEAL_STATUS.WON) {
        return false;
      }

      return this.createDeal(deal);
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }

  @Post()
  @ApiOperation({ summary: 'Cria uma oferta a partir do objeto especificado' })
  @ApiResponse({ ...OK_RESPONSE })
  @ApiResponse({ ...INVALID_PARAM_EXCEPTION_RESPONSE })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  @ApiBody({
    required: true,
    description: 'Acordo a ser processado',
    // type: IDeal
  })
  async createDeal(@Body() deal: IDeal): Promise<boolean> {
    try {
      console.log('deal:', deal);
      if (!deal) {
        throw new InvalidParamException('deal');
      }

      if (deal.status !== PIPEDRIVE_DEAL_STATUS.WON) {
        return false;
      }

      const result = await this.blingService.createOrderByPipedriveDeal(deal);
      if (![HttpStatus.OK, HttpStatus.CREATED].includes(result.status)) {
        throw new ExternalBadRequestException('Bling');
      }

      return true;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }
}

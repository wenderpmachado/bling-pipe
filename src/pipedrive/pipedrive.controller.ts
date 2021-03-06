import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { ApiBody, ApiExcludeEndpoint, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IDeal, IDealUpdate } from '../_common/deal.interface';
import { ExternalBadRequestException } from '../_core/exceptions/bad-request.exception';
import { InternalServerErrorException } from '../_core/exceptions/internal-server-error.exception';
import { InvalidParamException } from '../_core/exceptions/invalid-param.exception';
import { NoContentException } from '../_core/exceptions/no-content.exception';
import { EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE } from '../_core/responses/bad-request.response';
import { INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE } from '../_core/responses/internal-server-error.response';
import { INVALID_PARAM_EXCEPTION_RESPONSE } from '../_core/responses/invalid-param.response';
import { NO_CONTENT_EXCEPTION_RESPONSE } from '../_core/responses/no-content.response';
import { OK_RESPONSE } from '../_core/responses/ok.response';
import { PipedriveDeal } from './../_common/deal.model';
import { BlingService } from './../bling/bling.service';
import { DealDTO } from './../deal/deal.schema';
import { DealService } from './../deal/deal.service';
import { ExtractDealObject } from './helpers/extract-deal-object.helper';
import { ParseDealToCreateDealDTO } from './helpers/parse-deal-to-create-deal-dto.helper';
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
    private blingService: BlingService,
    private dealService: DealService
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
    description: 'Status da oferta',
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
  @ApiResponse({ ...OK_RESPONSE, type: [DealDTO] })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  async syncWonDeal(): Promise<DealDTO[]> {
    try {
      const deals = await this.findDeals();

      const results = [] as DealDTO[];
      for (const deal of deals) {
        const createdDeal = await this.createDeal(deal);
        if (createdDeal) {
          results.push(createdDeal as DealDTO);
        }
      }

      return results;
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
  @ApiResponse({ ...OK_RESPONSE, type: DealDTO })
  @ApiResponse({ ...INVALID_PARAM_EXCEPTION_RESPONSE })
  @ApiResponse({ ...EXTERNAL_BAD_REQUEST_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  @ApiBody({
    required: true,
    description: 'Oferta a ser processada',
    type: PipedriveDeal
  })
  async createDeal(@Body() deal: IDeal): Promise<DealDTO | boolean> {
    try {
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

      const createDealDTO = ParseDealToCreateDealDTO(deal);
      const createdDeal = await this.dealService.save(createDealDTO);

      return createdDeal;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }
}

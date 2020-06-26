import { OK_RESPONSE } from './../_core/responses/ok.response';
import { NO_CONTENT_EXCEPTION_RESPONSE } from './../_core/responses/no-content.response';
import { NoContentException } from './../_core/exceptions/no-content.exception';
import { NOT_FOUND_EXCEPTION_RESPONSE } from './../_core/responses/not-found.response';
import { NotFoundException } from './../_core/exceptions/not-found.exception';
import { INVALID_PARAM_EXCEPTION_RESPONSE } from './../_core/responses/invalid-param.response';
import { InvalidParamException } from './../_core/exceptions/invalid-param.exception';
import { isEmpty } from 'lodash';
import { INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE } from './../_core/responses/internal-server-error.response';
import { InternalServerErrorException } from './../_core/exceptions/internal-server-error.exception';
import { Deal } from './deal.schema';
import { ApiTags, ApiResponse, ApiParam, ApiOperation } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { DealService } from './deal.service';

@ApiTags('Deal')
@Controller('deals')
export class DealController {
  constructor(private dealService: DealService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as ofertas consolidadas' })
  @ApiResponse({ ...OK_RESPONSE, type: [Deal] })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  getAll(): Promise<Deal[]> {
    try {
      return this.dealService.getAll();

    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma oferta consolidada' })
  @ApiResponse({ ...OK_RESPONSE, type: Deal })
  @ApiResponse({ ...INVALID_PARAM_EXCEPTION_RESPONSE })
  @ApiResponse({ ...NOT_FOUND_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'ID da oferta',
    type: String,
  })
  async getOne(@Param('id') id: string): Promise<Deal> {
    try {
      if (isEmpty(id)) {
        throw new InvalidParamException('id');
      }

      const deal = await this.dealService.getOne(id);

      if (!deal) {
        throw new NotFoundException();
      }

      return deal;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }

  @Get('aggregated')
  @ApiOperation({ summary: 'Obter todas as ofertas consolidadas, agregando por dia e valor' })
  @ApiResponse({ ...OK_RESPONSE, type: [Deal] })
  @ApiResponse({ ...NO_CONTENT_EXCEPTION_RESPONSE })
  @ApiResponse({ ...INTERNAL_SERVER_ERROR_EXCEPTION_RESPONSE })
  async getAggregated(): Promise<Deal[]> {
    try {
      const result = await this.dealService.getAggregated();

      if (!result || result.length === 0) {
        throw new NoContentException();
      }

      return result;
    } catch (error) {
      if (!error.status) {
        throw new InternalServerErrorException(error);
      }

      throw error;
    }
  }
}

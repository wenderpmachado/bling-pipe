import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { IDeal } from '../_common/deal.interface';
import { BlingHttpService } from './bling.http.service';
import { GenerateOrderXMLFromDeal } from './helpers/generate-order-xml.helper';

@Injectable()
export class BlingService {
  #orderEndpoint = 'pedido/json';

  constructor(private httpService: BlingHttpService) {}

  public get orderEndpoint(): string {
    return this.#orderEndpoint;
  }

  async createOrderByPipedriveDeal(deal: IDeal): Promise<AxiosResponse<any>> {
    const xml = GenerateOrderXMLFromDeal(deal);
    const url = `${this.orderEndpoint}?xml=${xml}`;

    return await this.httpService.api.post(url);
  }
}

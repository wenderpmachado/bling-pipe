import { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { PipedriveHttpService } from './pipedrive.http.service';

import { PIPEDRIVE_DEAL_STATUS_TYPE, PIPEDRIVE_DEAL_STATUS } from './pipedrive-status.type';

@Injectable()
export class PipedriveService {
  private dealsEndpoint = 'deals';

  constructor(private httpService: PipedriveHttpService) {}

  async findDeals(
    status: PIPEDRIVE_DEAL_STATUS_TYPE = PIPEDRIVE_DEAL_STATUS.WON,
    start = 0,
    limit = 0,
    sort = 'id',
    sortDirection = 'DESC'
  ): Promise<AxiosResponse<any>> {
    let url = `${this.dealsEndpoint}?start=${start}&limit=${limit}&sort=${sort} ${sortDirection}`;

    if (status) {
      url += `&status=${status}`
    }

    return this.httpService.api.get(encodeURI(url));
  }
}

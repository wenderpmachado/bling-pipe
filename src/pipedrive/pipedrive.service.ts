import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';

import { PIPEDRIVE_STATUS_TYPE, PIPEDRIVE_STATUS } from './pipedrive-status.type';

@Injectable()
export class PipedriveService {
  constructor(private httpService: HttpService) {}

  async findOpportunities(status: PIPEDRIVE_STATUS_TYPE = PIPEDRIVE_STATUS.WON): Promise<AxiosResponse<any>> {
    let url = `&start=0`;

    if (status) {
      url += `&status=${status}`
    }

    return this.httpService.get(url).toPromise();
  }
}

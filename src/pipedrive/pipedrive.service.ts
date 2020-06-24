import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PipedriveService {
  private token: string;
  private companyDomain: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    this.companyDomain = this.configService.get<string>('PIPEDRIVE_COMPANY_DOMAIN');
    this.token = this.configService.get<string>('PIPEDRIVE_API_TOKEN');

    this.baseUrl = `https://${this.companyDomain}.pipedrive.com/api/v1/deals?api_token=${this.token}`;
  }
}

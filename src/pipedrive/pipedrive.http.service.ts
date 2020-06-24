import { ConfigService } from '@nestjs/config';
import { Injectable, HttpModuleOptionsFactory, HttpModuleOptions, HttpService } from '@nestjs/common';

@Injectable()
export class PipedriveHttpService implements HttpModuleOptionsFactory {
  private token: string;
  private companyDomain: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    this.companyDomain = this.configService.get<string>('PIPEDRIVE_COMPANY_DOMAIN');
    this.token = this.configService.get<string>('PIPEDRIVE_API_TOKEN');

    // FIXME: Remove api_token from url
    this.baseUrl = `https://${this.companyDomain}.pipedrive.com/api/v1/deals?api_token=${this.token}`;
  }

  createHttpOptions(): HttpModuleOptions {
    return {
      baseURL: this.baseUrl
    };
  }
}

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlingService {
  private token: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    this.token = this.configService.get<string>('BLING_API_TOKEN');
    this.baseUrl = 'https://bling.com.br/Api/v2/';
  }
}

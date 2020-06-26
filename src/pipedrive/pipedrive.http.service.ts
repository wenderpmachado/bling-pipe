import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IHttpService } from './../core/interfaces/http-service.interface';

@Injectable()
export class PipedriveHttpService implements IHttpService {
  private token: string;
  private companyDomain: string;
  private baseURL: string;
  private axios: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.companyDomain = this.configService.get<string>('PIPEDRIVE_COMPANY_DOMAIN');
    this.token = this.configService.get<string>('PIPEDRIVE_API_TOKEN');

    this.baseURL = `https://${this.companyDomain}.pipedrive.com/api/v1/`;

    this.axios = axios.create({
      baseURL: this.baseURL,
    });

    this.axios.interceptors.request.use((config: AxiosRequestConfig) => {
      config.url += !config.url ? '?' : '&';
      config.url += `api_token=${this.token}`;
      return config;
    });
  }

  get api(): AxiosInstance {
    return this.axios;
  }
}

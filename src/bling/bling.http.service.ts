import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { IHttpService } from './../core/interfaces/http-service.interface';

@Injectable()
export class BlingHttpService implements IHttpService {
  private token: string;
  private baseURL: string;
  private axios: AxiosInstance;

  constructor(private configService: ConfigService) {
    this.token = this.configService.get<string>('BLING_API_TOKEN');
    this.baseURL = 'https://bling.com.br/Api/v2/';

    this.axios = axios.create({
      baseURL: this.baseURL
    });

    this.axios.interceptors.request.use(this.onRequest);
  }

  onRequest(config: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> {
    config.url += !config.url ? '?' : '&';
    config.url += `apikey=${this.token}`;
    return config;
  }

  get api(): AxiosInstance {
    return this.axios;
  }
}

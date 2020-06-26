import { BlingHttpService } from './bling.http.service';
import { IDeal } from './../pipedrive/deal.interface';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BlingService } from './bling.service';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

const mockApi = (url: string, config?: AxiosRequestConfig): AxiosPromise<any> => ({} as AxiosPromise<any>)

describe('BlingService', () => {
  let service: BlingService;
  let httpService: BlingHttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        BlingService
      ],
    }).compile();

    service = module.get<BlingService>(BlingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('orderEndpoint should be defined', () => {
    expect(new BlingService(httpService).orderEndpoint).toBeDefined();
  });

  it('should try create a order by pipedrive deal', () => {
    const deal: IDeal = {
      id: 1,
      user_id: 1,
      currency: 'BRL',
      title: 'Negocio 1',
      value: 500
    }
    jest.spyOn(httpService, 'api').mockImplementation(mockApi);

    expect(service.createOrderByPipedriveDeal(deal)).not.toThrowError();
  });
});

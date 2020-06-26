import { ConfigModule } from '@nestjs/config';
import { BlingHttpService } from './../bling/bling.http.service';
import { IDeal } from '../_common/deal.interface';
import { PipedriveHttpService } from './pipedrive.http.service';
import { BlingService } from './../bling/bling.service';
import { PipedriveService } from './pipedrive.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PipedriveController } from './pipedrive.controller';
import { PIPEDRIVE_DEAL_STATUS } from './pipedrive-status.type';

describe('Pipedrive Controller', () => {
  let controller: PipedriveController;
  let deal: IDeal;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot()
      ],
      controllers: [
        PipedriveController
      ],
      providers: [
        PipedriveService,
        PipedriveHttpService,
        BlingService,
        BlingHttpService
      ]
    }).compile();

    controller = module.get<PipedriveController>(PipedriveController);

    deal = {
      id: 1,
      currency: 'BRL',
      user_id: 1,
      add_time: new Date().toUTCString(),
      close_time: new Date().toUTCString(),
      title: 'Business 1',
      value: 500,
      products_count: 1,
      org_name: 'Organization',
      person_name: 'Person',
      status: PIPEDRIVE_DEAL_STATUS.WON
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all won deals', () => {
    expect(controller.createDeal(deal)).not.toThrow();
  });

  it('should create a Deal', () => {
    expect(controller.createDeal(deal)).not.toThrow();
  });
});

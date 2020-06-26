import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { BlingHttpService } from './../bling/bling.http.service';
import { BlingService } from './../bling/bling.service';
import { Deal, DealSchema } from './../deal/deal.schema';
import { DealService } from './../deal/deal.service';
import { PipedriveController } from './pipedrive.controller';
import { PipedriveHttpService } from './pipedrive.http.service';
import { PipedriveService } from './pipedrive.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Deal.name,
      schema: DealSchema
    }])
  ],
  providers: [
    PipedriveService,
    PipedriveHttpService,
    BlingService,
    BlingHttpService,
    DealService
  ],
  controllers: [
    PipedriveController
  ]
})
export class PipedriveModule {}

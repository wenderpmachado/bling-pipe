import { Module } from '@nestjs/common';
import { BlingHttpService } from './../bling/bling.http.service';
import { BlingService } from './../bling/bling.service';
import { PipedriveService } from './pipedrive.service';
import { PipedriveHttpService } from './pipedrive.http.service';
import { PipedriveController } from './pipedrive.controller';

@Module({
  providers: [
    PipedriveService,
    PipedriveHttpService,
    BlingService,
    BlingHttpService
  ],
  controllers: [
    PipedriveController
  ]
})
export class PipedriveModule {}

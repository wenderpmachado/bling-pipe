import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './_core/config/mongoose-config.service';
import { AppController } from './app.controller';
import { PipedriveModule } from './pipedrive/pipedrive.module';
import { BlingModule } from './bling/bling.module';
import { DealModule } from './deal/deal.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({ useClass: MongooseConfigService }),
    PipedriveModule,
    BlingModule,
    DealModule,
  ],
  controllers: [
    AppController,
  ],
})
export class AppModule {}

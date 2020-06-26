import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { Deal, DealSchema } from './deal.schema';
import { DealController } from './deal.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Deal.name,
      schema: DealSchema
    }])
  ],
  providers: [DealService],
  controllers: [DealController]
})
export class DealModule {}

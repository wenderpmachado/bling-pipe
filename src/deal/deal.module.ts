import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { Deal, DealSchema } from './deal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Deal.name,
      schema: DealSchema
    }])
  ],
  providers: [DealService]
})
export class DealModule {}

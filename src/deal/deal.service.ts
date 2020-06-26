import { CreateDealDTO, Deal } from './deal.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DealService {
  constructor(@InjectModel(Deal.name) private readonly dealModel: Model<Deal>) {}

  async save(deal: CreateDealDTO): Promise<Deal> {
    const found = await this.dealModel.find({ pipedrive_id: deal.pipedrive_id }).exec();

    let document: Deal;
    if (found && found.length > 0) {
      document = { ...found[0], ...deal } as Deal;
    } else {
      document = new this.dealModel(deal);
    }

    return document.save();
  }
}

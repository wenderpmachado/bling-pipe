import { CreateDealDTO, Deal } from './deal.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DealService {
  constructor(@InjectModel(Deal.name) private readonly dealModel: Model<Deal>) {}

  async save(deal: CreateDealDTO): Promise<Deal> {
    const found = await this.dealModel.find({ pipedrive_id: deal.pipedrive_id }).exec();

    if (found && found.length > 0) {
      return found[0];
    } else {
      const document = new this.dealModel(deal);
      return document.save();
    }

  }

  async getAll(): Promise<Deal[]> {
    return this.dealModel.find();
  }

  async getOne(id: string): Promise<Deal> {
    return this.dealModel.findOne({ _id: id });
  }

  async getAggregated(): Promise<Deal[]> {
    const aggregated = await this.dealModel.aggregate([
      {
        '$group': {
          '_id': {
            '$dateToString': {
              'format': '%d/%m/%Y',
              'date': '$won_time'
            }
          },
          'total': {
            '$sum': '$value'
          }
        }
      }
    ]);

    return aggregated;
  }
}

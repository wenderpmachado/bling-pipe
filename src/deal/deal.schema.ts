import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class CreateDealDTO {
  pipedrive_id: number;
  title: string;
  value: number;
  currency: string;
  won_time: string;
  org_name?: string;
  person_name?: string;
}

export class DealDTO extends CreateDealDTO {
  _id: string;
}

@Schema()
export class Deal extends Document {
  @ApiProperty()
  @Prop()
  pipedrive_id: number;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  value: number;

  @ApiProperty()
  @Prop()
  currency: string;

  @ApiProperty()
  @Prop()
  won_time: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  org_name?: string;

  @ApiProperty({ required: false })
  @Prop({ required: false })
  person_name?: string;
}

export const DealSchema = SchemaFactory.createForClass(Deal);

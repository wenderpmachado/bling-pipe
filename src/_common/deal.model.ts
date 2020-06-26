import { ApiProperty } from '@nestjs/swagger';
import { PIPEDRIVE_DEAL_STATUS_TYPE, PIPEDRIVE_DEAL_STATUS } from './../pipedrive/pipedrive-status.type';

export class PipedriveDeal {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty({ required: false })
  won_time?: string;

  @ApiProperty({ required: false })
  add_time?: string;

  @ApiProperty({ required: false })
  close_time?: string;

  @ApiProperty({ required: false })
  products_count?: number;

  @ApiProperty({ required: false })
  org_name?: string;

  @ApiProperty({ required: false })
  person_name?: string;

  @ApiProperty({ required: false, enum: PIPEDRIVE_DEAL_STATUS })
  status?: PIPEDRIVE_DEAL_STATUS_TYPE;
}

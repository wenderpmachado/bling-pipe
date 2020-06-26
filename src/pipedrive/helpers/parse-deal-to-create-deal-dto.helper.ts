import { IDeal } from '../../_common/deal.interface';
import { CreateDealDTO } from '../../deal/deal.schema';

export function ParseDealToCreateDealDTO(deal: IDeal): CreateDealDTO {
  return {
    pipedrive_id: deal.id,
    title: deal.title,
    value: deal.value,
    currency: deal.currency,
    won_time: deal.won_time,
    org_name: deal.org_name,
    person_name: deal.person_name,
  }
}

import { IDeal } from './../deal.interface';

export function ExtractDealObject(deal: IDeal): IDeal {
  const {
    id,
    currency,
    add_time,
    close_time,
    title,
    value,
    products_count,
    org_name,
    person_name,
    status
  } = deal;

  let { user_id } = deal;

  user_id = typeof user_id === 'number' ? user_id : user_id.id;

  return {
    id,
    user_id,
    currency,
    add_time,
    close_time,
    org_name,
    person_name,
    title,
    value,
    products_count,
    status
  }
}

import { IDeal } from '../../_common/deal.interface';
import { ParseDealToCreateDealDTO } from './parse-deal-to-create-deal-dto.helper';

describe('ExternalBadRequestException', () => {
  let deal: IDeal;

  beforeEach(async () => {
    deal = {
      id: 1,
      currency: 'BRL',
      user_id: 1,
      add_time: new Date().toUTCString(),
      close_time: new Date().toUTCString(),
      title: 'Business 1',
      value: 500,
      products_count: 1,
      org_name: 'Organization',
      person_name: 'Person'
    }
  });

  it('should parse correctly', () => {
    const extractedDeal = ParseDealToCreateDealDTO(deal);
    expect(extractedDeal).toBeDefined();
  });
});

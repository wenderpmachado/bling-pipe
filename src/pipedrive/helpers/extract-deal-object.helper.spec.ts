import { IDeal } from './../../pipedrive/deal.interface';
import { ExtractDealObject } from './extract-deal-object.helper';

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

  it('should generate order XML from Deal', () => {
    const extractedDeal = ExtractDealObject(deal);
    expect(extractedDeal).toBeDefined();
  });

  it('should generate order XML from Deal with organization name, person name and user_id as an object', () => {
    deal = {
      ...deal,
      user_id: { id: 1 }
    }

    const extractedDeal = ExtractDealObject(deal);
    expect(extractedDeal).toBeDefined();
  });
});

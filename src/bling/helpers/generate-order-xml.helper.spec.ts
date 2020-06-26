import { IDeal } from '../../_common/deal.interface';
import { GenerateOrderXMLFromDeal } from './generate-order-xml.helper';

describe('ExternalBadRequestException', () => {
  let deal: IDeal;

  beforeEach(async () => {
    deal = {
      id: 1,
      user_id: 1,
      currency: 'BRL',
      title: 'Business 1',
      value: 500
    }
  });

  it('should generate order XML from Deal', () => {
    const xml = GenerateOrderXMLFromDeal(deal);
    expect(xml.length).toBeGreaterThan(0);
  });

  it('should generate order XML from Deal with organization name, person name and user_id as an object', () => {
    deal = {
      ...deal,
      org_name: 'Organization',
      person_name: 'Person',
      user_id: { id: 1 }
    }

    const xml = GenerateOrderXMLFromDeal(deal);
    expect(xml.length).toBeGreaterThan(0);
  });
});

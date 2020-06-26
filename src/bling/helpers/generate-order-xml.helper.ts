import { create } from 'xmlbuilder2';
import { IDeal } from '../../_common/deal.interface';

export function GenerateOrderXMLFromDeal(deal: IDeal, prettyPrint?: boolean): string {
  const obj = {
    pedido: {
      ...parseOrder(deal),
      cliente: parseClient(deal),
      itens: {
        item: parseDeal(deal)
      }
    }
  };

  const doc = create({ version: '1.0', encoding: 'UTF-8' }, obj);
  const xml = doc.end({ prettyPrint });

  return encodeURIComponent(xml);
}

function parseOrder(deal: IDeal)  {
  const userId = typeof deal.user_id === 'number' ? deal.user_id : deal.user_id.id;

  let obs = `user_id:${userId};currency:${deal.currency}`

  if (deal.org_name && deal.person_name) {
    obs += `;person_id_name:${deal.person_name}`
  }

  return {
    numero: deal.id,
    // data: deal.add_time, // TODO: Format date
    // data_saida: deal.close_time, // TODO: Format date
    obs_internas: obs
  }
}

function parseClient(deal: IDeal)  {
  const tipoPessoa = deal.org_name ? 'J' : 'F';
  const nome = deal.org_name ? deal.org_name : deal.person_name;

  return {
    nome,
    tipoPessoa
  }
}

function parseDeal(deal: IDeal)  {
  return {
    codigo: deal.id,
    descricao: deal.title,
    qtde: 1, // If want to use deal.products_count, divide deal.value by deal.products_count
    vlr_unit: deal.value,
    un: 'un'
  }
}

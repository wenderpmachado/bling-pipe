import { create } from 'xmlbuilder2';
import { IDeal } from './../../pipedrive/deal.interface';

export function GenerateOrderXMLFromDeal(deal: IDeal, prettyPrint?: boolean): string {
  const obj = {
    pedido: {
      ...parseOrder(deal),
      cliente: parseClient(deal),
      itens: { item: parseDeal(deal) }
    }
  };

  const doc = create({ version: '1.0', encoding: 'UTF-8' }, obj);
  const xml = doc.end({ prettyPrint });

  return xml;
}

function parseOrder(deal: IDeal)  {
  let obs = `user_id:${deal.user_id.id};currency:${deal.currency}`

  if (deal.org_id && deal.person_id) {
    obs += `;person_id_name:${deal.person_id.name}`
  }

  return {
    numero: deal.id,
    data: deal.add_time,
    data_saida: deal.close_time,
    obs_internas: obs
  }
}

function parseClient(deal: IDeal)  {
  const tipoPessoa = deal.org_id ? 'J' : 'F';
  const nome = deal.org_id ? deal.org_id.name : deal.person_id.name;

  return {
    nome,
    tipoPessoa
  }
}

function parseDeal(deal: IDeal)  {
  return {
    codigo: deal.id,
    descricao: deal.title,
    qtde: deal.products_count,
    vlr_unit: deal.value,
    un: 'un'
  }
}

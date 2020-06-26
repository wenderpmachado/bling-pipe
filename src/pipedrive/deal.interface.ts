import { PIPEDRIVE_DEAL_STATUS_TYPE } from './pipedrive-status.type';
export interface IDeal {
  /** Item code */
  id: number;

  /** Item description */
  title: string;

  /** Unit value */
  value: number;

  /** Currency */
  currency: string;

  /** Create date */
  add_time?: string;

  /** Deal date */
  close_time?: string;

  /** Item amount */
  products_count?: number;

  /** Salesman object or id*/
  user_id: IUser | number;

  /** Organization info */
  org_name?: string;

  /** Person info */
  person_name?: string;

  status?: PIPEDRIVE_DEAL_STATUS_TYPE;
}

interface IUser {
  id: number;
}

export interface IDealUpdate {
  current: IDeal;
}

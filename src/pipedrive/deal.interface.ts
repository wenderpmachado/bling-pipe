export interface IDeal {
  /** Item code */
  id: string;

  /** Salesman */
  user_id: IUser;

  currency: string;

  /** create date */
  add_time: string;

  /** deal date */
  close_time?: string;

  /** Organization info */
  org_id?: IOrganization;

  /** Person info */
  person_id?: IPerson;

  /** Item description */
  title: string;

  /** Unit value */
  value: number;

  /** Item amount */
  products_count: number;
}

interface IUser {
  id: string;
}

interface IOrganization {
  name: string;
}

interface IPerson {
  name: string;
}

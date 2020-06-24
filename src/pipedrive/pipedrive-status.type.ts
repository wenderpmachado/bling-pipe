export enum PIPEDRIVE_STATUS {
  WON = 'won',
  LOST = 'lost'
}

export const PIPEDRIVE_STATUS_OPTIONS = [PIPEDRIVE_STATUS.WON, PIPEDRIVE_STATUS.LOST]

export type PIPEDRIVE_STATUS_TYPE = PIPEDRIVE_STATUS.WON | PIPEDRIVE_STATUS.LOST;

export function IsAPipedriveStatusOption(status: PIPEDRIVE_STATUS): boolean {
  return PIPEDRIVE_STATUS_OPTIONS.includes(status);
}

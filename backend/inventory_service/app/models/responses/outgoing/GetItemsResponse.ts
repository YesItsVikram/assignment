import { Status, Item } from '@custom_modules/models';

export interface GetItemsResponse {
  status: Status;
  items: Item[];
}

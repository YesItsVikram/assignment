import { BaseResponse } from '../BaseResponse';
import { Item } from '../../Item';

export interface GetItemsResponse extends BaseResponse {
  items: Item[];
}

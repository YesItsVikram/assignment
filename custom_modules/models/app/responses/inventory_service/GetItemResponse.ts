import { BaseResponse } from '../BaseResponse';
import { Item } from '../../Item';

export interface GetItemResponse extends BaseResponse {
  item: Item;
}

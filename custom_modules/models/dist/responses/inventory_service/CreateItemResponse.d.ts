import { BaseResponse } from '../BaseResponse';
import { Item } from '../../Item';
export interface CreateItemResponse extends BaseResponse {
    item: Item;
}

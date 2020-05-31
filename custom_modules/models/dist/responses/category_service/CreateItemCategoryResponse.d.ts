import { ItemCategory } from '../../ItemCategory';
import { BaseResponse } from '../BaseResponse';
export interface CreateItemCategoryResponse extends BaseResponse {
    category: ItemCategory;
}

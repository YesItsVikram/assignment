import { BaseResponse } from '../BaseResponse';
import { ItemCategory } from '../../ItemCategory';
import { ContainerCategory } from '../../ContainerCategory';
export interface GetCategoriesResponse<T extends ItemCategory | ContainerCategory> extends BaseResponse {
    categories: T[];
}

import { ContainerCategory } from '../../ContainerCategory';
import { BaseResponse } from '../BaseResponse';

export interface CreateContainerCategoryResponse extends BaseResponse {
  category: ContainerCategory;
}

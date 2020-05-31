import { BaseResponse } from '../BaseResponse';
import { ItemCategory } from '../../ItemCategory';
import { ContainerCategory } from '../../ContainerCategory';

export interface GetCategryResponse<T extends ItemCategory | ContainerCategory>
  extends BaseResponse {
  category: T;
}

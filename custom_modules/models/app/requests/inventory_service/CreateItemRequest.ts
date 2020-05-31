import { ItemDetails } from '../../Item';

export interface CreateItemRequest {
  categoryId: string;
  details?: ItemDetails;
}

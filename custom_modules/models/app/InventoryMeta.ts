import { Document } from './Document';

export interface InventoryMeta extends Document {
  _id: 'ALL' | string; // _id of the category or "ALL" for all categories
  itemsCount: number;
}

import { Document } from '../Document';

export interface InventoryMeta extends Document {
  category: 'ALL' | string;
  itemsCount: number;
}

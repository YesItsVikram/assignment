import { Document } from './Document';
export interface InventoryMeta extends Document {
    categoryId: 'ALL' | string;
    itemsCount: number;
}

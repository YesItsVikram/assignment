import { Document } from './Document';
export interface InventoryMeta extends Document {
    _id: 'ALL' | string;
    itemsCount: number;
}

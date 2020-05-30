import { Document } from './Document';
import { ItemCategory } from './ItemCategory';

interface ItemBase extends Document {
  category: {
    id: string;
    name: string;
  };

  parentContainerId?: string;
}

interface ItemDetails {
  [key: string]: any;
}

export type Item = ItemBase & Exclude<ItemDetails, ItemBase>;

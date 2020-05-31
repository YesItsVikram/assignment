import { Document } from './Document';

interface ItemBase extends Document {
  category: {
    id: string;
    name: string;
  };

  parentContainerId?: string;
}

export interface ItemDetails {
  [key: string]: any;
}

export type Item = ItemBase & ItemDetails;

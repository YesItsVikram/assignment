import { Document } from './Document';

export interface Container extends Document {
  type: string;
  holds: 'CONTAINERS' | 'INVENTORY' | 'NONE';

  containerIds?: string[];
  ItemIds?: string[];

  parentContainerId?: string;
  treeId: string;
}

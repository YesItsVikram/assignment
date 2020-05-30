import { Document } from './Document';

type Holdable = 'CONTAINERS' | 'INVENTORY';

export interface Container extends Document {
  type: string;

  canHold: Holdable;
  holds: Holdable | 'NONE';

  containerIds?: string[];
  ItemIds?: string[];

  parentContainerId?: string;
  treeId: string;
}

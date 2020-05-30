import { Document } from './Document';

type Holdable = 'CONTAINERS' | 'INVENTORY';

export interface Container extends Document {
  type: string;

  canHold: Holdable | 'ALL';
  holds: Holdable | 'NONE';

  containerIds: string[];
  itemIds: string[];

  parentContainerId?: string;
}

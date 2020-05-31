import { CategorySchema } from './CategorySchema';
import { Document } from './Document';

export type Holdable = 'CONTAINERS' | 'INVENTORY';

export interface ContainerCategory extends Document {
  kind: string;
  schema: CategorySchema;

  canHold: Holdable;
}

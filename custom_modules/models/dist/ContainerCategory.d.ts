import { CategorySchema } from './CategorySchema';
import { Document } from './Document';
export declare type Holdable = 'CONTAINERS' | 'INVENTORY';
export interface ContainerCategory extends Document {
    kind: string;
    schema: CategorySchema;
    canHold: Holdable;
}

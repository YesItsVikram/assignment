import { Document } from './Document';
declare type Holdable = 'CONTAINERS' | 'INVENTORY';
export interface Container extends Document {
    type: string;
    canHold: Holdable;
    containerIds: string[];
    itemIds: string[];
    parentContainerId?: string;
}
export {};

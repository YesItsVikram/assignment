import { Document } from './Document';
import { Holdable } from './ContainerCategory';
interface ContainerBase extends Document {
    category: {
        id: string;
        kind: string;
        canHold: Holdable;
    };
    containerIds: string[];
    itemIds: string[];
    parentContainerId?: string;
}
export interface ContainerDetails {
    [key: string]: any;
}
export declare type Container = ContainerBase & ContainerDetails;
export {};

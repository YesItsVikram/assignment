import { Document } from './Document';
interface ItemBase extends Document {
    category: {
        id: string;
        kind: string;
    };
    parentContainerId?: string;
}
export interface ItemDetails {
    [key: string]: any;
}
export declare type Item = ItemBase & ItemDetails;
export {};

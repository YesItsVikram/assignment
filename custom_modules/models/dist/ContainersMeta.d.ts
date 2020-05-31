import { Document } from './Document';
export interface ContainersMeta extends Document {
    _id: 'ALL' | string;
    containersCount: number;
}

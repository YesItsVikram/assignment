import { Document } from './Document';
export interface ContainersMeta extends Document {
    categoryId: 'ALL' | string;
    containersCount: number;
}

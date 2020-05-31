import { Document } from './Document';

export interface ContainersMeta extends Document {
  _id: 'ALL' | string; // _id of the category or "ALL" for all categories
  containersCount: number;
}

import { Document } from '../Document';

export interface ContainersMeta extends Document {
  category: 'ALL' | string;
  containersCount: number;
}

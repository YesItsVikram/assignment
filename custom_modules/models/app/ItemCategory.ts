import { CategorySchema } from './CategorySchema';
import { Document } from './Document';

export interface ItemCategory extends Document {
  name: string;
  schema: CategorySchema;
}

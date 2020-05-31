import { ItemCategory } from '../../ItemCategory';

export type CreateItemCategoryRequest = Pick<ItemCategory, 'name' | 'schema'>;

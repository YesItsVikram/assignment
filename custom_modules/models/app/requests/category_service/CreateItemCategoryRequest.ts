import { ItemCategory } from '../../ItemCategory';

export type CreateItemCategoryRequest = Pick<ItemCategory, 'kind' | 'schema'>;

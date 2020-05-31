import { ContainerCategory } from '../../ContainerCategory';

export type CreateContainerCategoryRequest = Pick<
  ContainerCategory,
  'canHold' | 'kind' | 'schema'
>;

export interface GetCategoriesRequest {
  collection: 'ITEMS' | 'CONTAINERS';
  pageNumber?: number;
  limit?: number;
}

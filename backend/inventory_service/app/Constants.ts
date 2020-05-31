export const PORT = process.env.PORT || 8081;

export const DatabaseConstants = {
  InventoryDb: {
    URI: '' + process.env.INVENTORY_DB_URI,
    Collections: {
      ITEMS: 'items',
      META: 'meta',
    },
  },
};

export const CategoryServiceConstants = {
  BASE_ROUTE: '' + process.env.CATEGORY_SERVICE_BASE_ROUTE,
  ROUTES: {
    GET_CATEGORY: '/getCategory',
  },
};

export enum ResponseTypes {
  SUCCESS,
  INVALID_REQUEST,
  INVALID_ROUTE,
  SOMETHING_WENT_WRONG,
}

export enum Routes {
  GET_ITEM = '/getItem',
  GET_ITEMS = '/getItems',
  ON_ITEM_MOVED_TO_CONTAINER = '/onItemMovedToContainer',
  CREATE_ITEM = '/createItem',
}

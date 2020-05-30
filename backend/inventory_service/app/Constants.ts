export const PORT = process.env.PORT || 8081;

export const DatabaseConstants = {
  InventoryDb: {
    URI: '' + process.env.INVENTORY_DB_URI,
    Collections: {
      ITEMS: 'items',
    },
  },
};

export enum ResponseTypes {
  SUCCESS,
  INVALID_REQUEST,
  SOMETHING_WENT_WRONG,
}

export enum Routes {
  GET_ITEM = '/getItem',
  GET_ITEMS = '/getItems',
  ON_ITEM_MOVED_TO_CONTAINER = 'onItemMovedToContainer',
}

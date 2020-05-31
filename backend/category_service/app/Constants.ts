export const PORT = process.env.PORT || 8082;

export const DatabaseConstants = {
  CategoryDb: {
    URI: '' + process.env.CATEGORY_DB_URI,
    Collections: {
      ITEM_CATEGORY: 'item_category',
      CONAINTER_CATEGORY: 'container_category',
    },
  },
};

export enum ResponseTypes {
  SUCCESS,
  INVALID_REQUEST,
  INVALID_ROUTE,
  SOMETHING_WENT_WRONG,
}

export enum Routes {
  CREATE_ITEM_CATEGORY = '/createItemCategory',
  CREATE_CONTAINER_CATEGORY = '/createContainerCategory',

  GET_CATEGORY_ROUTE = '/getCategory',
}

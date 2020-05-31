export const PORT = process.env.PORT || 8082;

export const DatabaseConstants = {
  CategoryDb: {
    URI: '' + process.env.CATEGORY_DB_URI,
    Collections: {
      ITEMS_CATEGORY: 'items_category',
      CONAINTERS_CATEGORY: 'containers_category',
    },
  },
};

export enum ResponseTypes {
  SUCCESS,
  INVALID_REQUEST,
  SOMETHING_WENT_WRONG,
}

export enum Routes {
  CREATE_ITEMS_CATEGORY = 'createItemsCategory',
  CREATE_CONTAINERS_CATEGORY = 'createContainersCategory',

  GET_CATEGORY_ROUTE = 'getCategory',
}

export const PORT = process.env.PORT || 8080;

export const DatabaseConstants = {
  ContainersDb: {
    URI: '' + process.env.CONTAINERS_DB_URI,
    Collections: {
      CONTAINERS: 'containers',
      META: 'meta',
    },
  },
};

export const InventoryServiceConstants = {
  BASE_ROUTE: '' + process.env.INVENTORY_SERVICE_BASE_ROUTE,
  ROUTES: {
    GET_ITEM: '/getItem',
    ON_ITEM_MOVE: '/onItemMovedToContainer',
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
  GET_CONTAINER = '/getContainer',
  GET_CONTAINERS = '/getContainers',

  CREATE_CONTAINER = '/createContainer',
  DELETE_CONTAINER = '/deleteContainer',

  MOVE_ITEM = '/moveItem',
  MOVE_CONTAINER = '/moveContainer',

  GET_ROOT_CONTAINER = '/getRootContainer',
}

export const PORT = process.env.PORT || 8080;

export const DatabaseConstants = {
  ContainersDb: {
    URI: '' + process.env.CONTAINERS_DB_URI,
    Collections: {
      CONTAINERS: 'containers',
      METAS: 'metas',
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

export enum ResponseTypes {
  SUCCESS,
  INVALID_REQUEST,
  SOMETHING_WENT_WRONG,
}

export enum Routes {
  GET_CONTAINER = '/getContainer',
  GET_CONTAINERS = '/getContainers',

  CREATE_CONTAINER = '/createContainer',
  DELETE_CONTAINER = '/deleteContainer',

  ADD_ITEM = '/addItem',
  MOVE_ITEM = '/moveItem',

  ADD_CONTAINER = '/addContainer',
  MOVE_CONTAINER = '/moveContainer',

  GET_ROOT_CONTAINER = '/getRootContainer',
}

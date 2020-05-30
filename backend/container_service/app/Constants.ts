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
  GET_ITEM_ROUTE: '' + process.env.IS_GET_ITEM_ROUTE,
  ON_ITEM_MOVE_ROUTE: '' + process.env.IS_ON_ITEM_MOVE_ROUTE,
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

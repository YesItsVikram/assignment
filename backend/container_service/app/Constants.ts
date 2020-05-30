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
  REMOVE_ITEM = '/removeItem',
  MOVE_ITEM = '/moveItem',

  ADD_CONTAINER = '/addContainer',
  MOVE_CONTAINER = '/moveContainer',
}

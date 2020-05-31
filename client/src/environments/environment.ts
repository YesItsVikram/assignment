import { Environment } from '@models/Environment';

export const environment: Environment = {
  production: false,

  ContainerServiceConstants: {
    BASE_ROUTE: 'http://localhost:8080',
    PATHS: {
      GET_CONTAINER: '/getContainer',
      GET_CONTAINERS: '/getContainers',

      CREATE_CONTAINER: '/createContainer',
      DELETE_CONTAINER: '/deleteContainer',

      MOVE_ITEM: '/moveItem',
      MOVE_CONTAINER: '/moveContainer',

      GET_ROOT_CONTAINER: '/getRootContainer',
    },
  },

  InventoryServiceConstants: {
    BASE_ROUTE: 'http://localhost:8081',
    PATHS: {
      GET_ITEM: '/getItem',
      GET_ITEMS: '/getItems',
      CREATE_ITEM: '/createItem',
    },
  },

  CategoryServiceConstants: {
    BASE_ROUTE: 'http://localhost:8082',
    PATHS: {
      GET_CATEGORIES: '/getCategories',
      CREATE_CONTAINER_CATEGORY: '/createContainerCategory',
      CREATE_ITEM_CATEGORY: '/createItemCategory',
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

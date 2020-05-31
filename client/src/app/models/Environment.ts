export interface Environment {
  production: boolean;

  ContainerServiceConstants: {
    BASE_ROUTE: string;
    PATHS: {
      GET_CONTAINER: string;
      GET_CONTAINERS: string;

      CREATE_CONTAINER: string;
      DELETE_CONTAINER: string;

      MOVE_ITEM: string;
      MOVE_CONTAINER: string;

      GET_ROOT_CONTAINER: string;
    };
  };

  InventoryServiceConstants: {
    BASE_ROUTE: string;
    PATHS: {
      GET_ITEM: string;
      GET_ITEMS: string;
    };
  };
}

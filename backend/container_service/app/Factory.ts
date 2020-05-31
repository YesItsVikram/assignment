import express from 'express';
import { Server } from './Server';
import { InventoryService } from './services/InventoryService';
import { CreateContainerRoute } from './routes/CreateContainerRoute';
import { Routes } from './Constants';
import { DeleteContainerRoute } from './routes/DeleteContainerRoute';
import { GetContainerRoute } from './routes/GetContainerRoute';
import { GetContainersRoute } from './routes/GetContainersRoute';
import { GetRootContainerRoute } from './routes/GetRootContainer';
import { MoveContainerRoute } from './routes/MoveContainerRoute';
import { MoveItemRoute } from './routes/MoveItemRoute';
import { ContainerDbManager } from './managers/ContainerDbManager';
import { CategoryService } from './services/CategoryService';

export class Factory {
  static GetServer() {
    const app = express();
    const containerDbManager = new ContainerDbManager();
    const inventoryService = new InventoryService();
    const categoryService = new CategoryService();

    return Server.GetInstance(
      app,
      containerDbManager,
      inventoryService,
      categoryService
    );
  }

  static InitAllRoutes() {
    new CreateContainerRoute(Routes.CREATE_CONTAINER, false);
    new DeleteContainerRoute(Routes.DELETE_CONTAINER, false);
    new GetContainerRoute(Routes.GET_CONTAINER, true);
    new GetContainersRoute(Routes.GET_CONTAINERS, true);
    new GetRootContainerRoute(Routes.GET_ROOT_CONTAINER, true);
    new MoveContainerRoute(Routes.MOVE_CONTAINER, false);
    new MoveItemRoute(Routes.MOVE_ITEM, false);
  }
}

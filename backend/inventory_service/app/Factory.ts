import express from 'express';
import { Server } from './Server';
import { InventoryDbManager } from './managers/InventoryDbManager';
import { GetItemRoute } from './routes/GetItemRoute';
import { Routes } from './Constants';
import { GetItemsRoute } from './routes/GetItemsRoute';
import { OnItemMovedToContainerRoute } from './routes/OnItemMovedToContainerRoute';
import { CategoryService } from './services/CategoryService';
import { CreateItemRoute } from './routes/CreateItemRoute';

export class Factory {
  static GetServer() {
    const app = express();
    const inventoryDbManager = new InventoryDbManager();
    const categoryService = new CategoryService();

    return Server.GetInstance(app, inventoryDbManager, categoryService);
  }

  static InitAllRoutes() {
    new GetItemRoute(Routes.GET_ITEM, true);
    new GetItemsRoute(Routes.GET_ITEMS, true);
    new OnItemMovedToContainerRoute(Routes.ON_ITEM_MOVED_TO_CONTAINER, false);
    new CreateItemRoute(Routes.CREATE_ITEM, false);
  }
}

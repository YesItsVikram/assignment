import express from 'express';
import { Server } from './Server';
import { CategoryDbManager } from './managers/CategoryDbManager';
import { CreateItemCategoryRoute } from './routes/CreateItemCategoryRoute';
import { Routes } from './Constants';
import { CreateContainerCategoryRoute } from './routes/CreateContainerCategoryRoute';
import { GetCategoryRoute } from './routes/GetCategoryRoute';

export class Factory {
  static GetServer() {
    const app = express();
    const categoryDbManager = new CategoryDbManager();

    return Server.GetInstance(app, categoryDbManager);
  }

  static InitAllRoutes() {
    new CreateItemCategoryRoute(Routes.CREATE_ITEM_CATEGORY, false);
    new CreateContainerCategoryRoute(Routes.CREATE_CONTAINER_CATEGORY, false);
    new GetCategoryRoute(Routes.GET_CATEGORY_ROUTE, true);
  }
}

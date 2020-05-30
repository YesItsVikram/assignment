import express from 'express';
import { Server } from './Server';
import { DbManager } from './managers/DbManager';
import { InventoryService } from './services/InventoryService';

export class Factory {
  static GetServer() {
    const app = express();
    const dbManager = new DbManager();
    const inventoryService = new InventoryService();

    return Server.GetInstance(app, dbManager, inventoryService);
  }

  static InitAllRoutes() {}
}

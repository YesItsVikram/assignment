import express from 'express';
import { Server } from './Server';
import { DbManager } from './managers/DbManager';

export class Factory {
  static GetServer() {
    const app = express();
    const dbManager = new DbManager();
    return Server.GetInstance(app, dbManager);
  }

  static InitAllRoutes() {}
}

import express from 'express';
import { Server } from './Server';
import { CategoryDbManager } from './managers/CategoryDbManager';

export class Factory {
  static GetServer() {
    const app = express();
    const categoryDbManager = new CategoryDbManager();

    return Server.GetInstance(app, categoryDbManager);
  }

  static InitAllRoutes() {}
}

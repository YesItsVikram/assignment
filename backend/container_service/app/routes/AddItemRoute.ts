import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { Tree } from '../models/Tree';

export class Route extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const {} = this.getParams(req);
    } catch (error) {
      throw error;
    }
  }
  // private createTree(containerId: string): Promise<Tree> {
  //   const tree: DocumentData<Tree> = {
  //     topContainerId: containerId,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   return this.server.dbManager.insertDocument<Tree>(tree);
  // }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';

export class Route extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const {} = this.getParams(req);
    } catch (error) {
      throw error;
    }
  }
}

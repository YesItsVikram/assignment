import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { DeleteContainerRequest } from '../models/requests/DeleteContainerRequest';
import { Container } from '../models/Container';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';
import { Tree } from '../models/Tree';

export class Route extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<DeleteContainerRequest>(req);

      const container = await this.server.dbManager.getDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: id }
      );
      if (!container || container.holds !== 'NONE')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.server.dbManager.deleteDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: id }
      );

      if (container.treeId)
        await this.server.dbManager.deleteDocument<Tree>(
          DatabaseConstants.ContainersDb.Collections.TREES,
          { _id: container.treeId }
        );

      ResponseHandler.SendResponse(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { DeleteContainerRequest } from '../models/requests/incoming/DeleteContainerRequest';
import { Container } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';

export class DeleteContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<DeleteContainerRequest>(req);

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, { _id: id });
      if (!container || !this.isContainerEmpty(container))
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.server.containerDbManager.deleteDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: id }
      );

      ResponseHandler.SendResponse(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private isContainerEmpty(container: Container): boolean {
    return (
      (container.canHold === 'CONTAINERS'
        ? container.containerIds
        : container.itemIds
      ).length === 0
    );
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { Container } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { GetRootContainerRequest } from '../models/requests/incoming/GetRootContainerRequest';
import { RouteError } from '../errors/RouteError';

export class GetRootContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { itemId } = this.getParams<GetRootContainerRequest>(req);

      const item = await this.server.inventoryService.getItem(itemId);

      if (!item || !item.parentContainerId)
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const container = await this.getRootContainer(item.parentContainerId);

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        container,
      });
    } catch (error) {
      throw error;
    }
  }

  private async getRootContainer(containerId: string): Promise<Container> {
    while (true) {
      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: containerId,
      });
      if (!container)
        throw new RouteError(
          ResponseTypes.SOMETHING_WENT_WRONG,
          `CONTAINER NOT FOUND FOR ID: ${containerId}`
        );

      if (!container.parentContainerId) return container;
      containerId = container.parentContainerId;
    }
  }
}

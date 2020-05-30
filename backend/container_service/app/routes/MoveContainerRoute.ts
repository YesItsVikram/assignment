import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { MoveContainerRequest } from '../models/requests/incoming/MoveContainerRequest';
import { Container } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class MoveContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, destinationContainerId } = this.getParams<
        MoveContainerRequest
      >(req);

      const destContainer = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: destinationContainerId,
      });

      if (
        !destContainer ||
        (destContainer.canHold !== 'CONTAINERS' &&
          destContainer.canHold !== 'ALL') ||
        destContainer.holds === 'INVENTORY'
      )
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, { _id: id });

      if (!container) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.updateDestContainer(id, destContainer);
      await this.updateContainer(id, destContainer._id);

      ResponseHandler.SendResponse(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private async updateContainer(containerId: string, destContainerId: string) {
    await this.server.containerDbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: containerId },
      {
        $set: {
          parentContainerId: destContainerId,
        },
      }
    );
  }

  private async updateDestContainer(
    containerId: string,
    destContainer: Container
  ) {
    await this.server.containerDbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: destContainer._id },
      {
        $set: {
          holds: 'CONTAINERS',
        },
        $push: {
          containerIds: containerId,
        },
      }
    );
  }
}

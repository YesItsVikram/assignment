import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  Container,
  MoveContainerRequest,
  MoveContainerResponse,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { ObjectId } from 'mongodb';

export class MoveContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, destinationContainerId } = this.getParams<
        MoveContainerRequest
      >(req);

      if (id === destinationContainerId)
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const destContainer = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: new ObjectId(destinationContainerId),
      });

      if (!destContainer || destContainer.category.canHold !== 'CONTAINERS')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: new ObjectId(id),
      });

      if (!container) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.updateDestContainer(id, destContainer);
      await this.updateContainer(id, destContainer._id.toString());

      ResponseHandler.SendResponse<MoveContainerResponse>(
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
      { _id: new ObjectId(containerId) },
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
      { _id: new ObjectId(destContainer._id) },
      {
        $push: {
          containerIds: containerId,
        } as any,
      }
    );
  }
}

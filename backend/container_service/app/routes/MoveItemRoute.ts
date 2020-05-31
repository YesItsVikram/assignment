import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  Container,
  MoveItemRequest,
  MoveItemResponse,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { ObjectId } from 'mongodb';

export class MoveItemRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, destinationContainerId } = this.getParams<MoveItemRequest>(
        req
      );

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: new ObjectId(destinationContainerId),
      });

      if (!container || container.category.canHold !== 'INVENTORY')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const item = await this.server.inventoryService.getItem(id);

      if (!item || !item.parentContainerId)
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.addItemToContainer(item._id.toString(), container);
      await this.server.inventoryService.itemMovedToContainer(
        item._id.toString(),
        container
      );

      await this.removeItemFromContainer(
        item._id.toString(),
        item.parentContainerId
      );
      ResponseHandler.SendResponse<MoveItemResponse>(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private async removeItemFromContainer(itemId: string, containerId: string) {
    const container = await this.server.containerDbManager.getDocument<
      Container
    >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
      _id: new ObjectId(containerId),
    });

    if (!container)
      throw new RouteError(
        ResponseTypes.SOMETHING_WENT_WRONG,
        ` CONTAINER FOR ID ${containerId} NOT FOUND`
      );

    container.itemIds = container.itemIds.filter((id) => id !== itemId);

    await this.server.containerDbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: new ObjectId(containerId) },
      {
        $set: {
          itemIds: container.itemIds,
        },
      }
    );
  }

  private async addItemToContainer(itemId: string, container: Container) {
    await this.server.containerDbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: new ObjectId(container._id) },
      {
        $push: {
          itemIds: itemId.toString(),
        } as any,
      }
    );
  }
}

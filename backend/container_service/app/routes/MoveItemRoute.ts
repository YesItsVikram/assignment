import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { MoveItemRequest } from '../models/requests/MoveItemRequest';
import { Container } from '../models/Container';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';

export class Route extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, destinationContainerId } = this.getParams<MoveItemRequest>(
        req
      );

      const container = await this.server.dbManager.getDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: destinationContainerId }
      );

      if (
        !container ||
        (container.canHold !== 'INVENTORY' && container.canHold !== 'ALL')
      )
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const item = await this.server.inventoryService.getItem(id);

      if (!item || !item.parentContainerId)
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.addItemToContainer(item._id, container);
      await this.server.inventoryService.itemMovedToContainer(
        item._id,
        container
      );
      await this.removeItemFromContainer(item._id, item.parentContainerId);
    } catch (error) {
      throw error;
    }
  }

  private async removeItemFromContainer(itemId: string, containerId: string) {
    const container = await this.server.dbManager.getDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: containerId }
    );

    if (!container)
      throw new RouteError(
        ResponseTypes.SOMETHING_WENT_WRONG,
        ` CONTAINER FOR ID ${containerId} NOT FOUND`
      );

    container.itemIds = container.itemIds.filter((id) => id !== itemId);

    // Container is empty now
    if (!container.itemIds.length) container.holds = 'NONE';

    await this.server.dbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: containerId },
      {
        $set: {
          itemIds: container.itemIds,
          holds: container.holds,
        },
      }
    );
  }

  private async addItemToContainer(itemId: string, container: Container) {
    await this.server.dbManager.updateDocument<Container>(
      DatabaseConstants.ContainersDb.Collections.CONTAINERS,
      { _id: container._id },
      {
        $set: {
          holds: 'INVENTORY',
        },
        $push: {
          itemIds: itemId,
        },
      }
    );
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { OnItemMovedToContainerRequest } from '../models/requests/incoming/OnItemMovedToContainerRequest';
import { Item } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { ObjectId } from 'mongodb';

export class OnItemMovedToContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { itemId, containerId } = this.getParams<
        OnItemMovedToContainerRequest
      >(req);

      const item = await this.server.inventoryDbManager.getDocument<Item>(
        DatabaseConstants.InventoryDb.Collections.ITEMS,
        { _id: new ObjectId(itemId) }
      );

      if (!item) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.updateItem(item, containerId);

      ResponseHandler.SendResponse(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private async updateItem(item: Item, containerId: string) {
    await this.server.inventoryDbManager.updateDocument<Item>(
      DatabaseConstants.InventoryDb.Collections.ITEMS,
      { _id: new ObjectId(item._id) },
      {
        $set: {
          parentContainerId: containerId,
        },
      }
    );
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetItemRequest } from '../models/requests/incoming/GetItemRequest';
import { Item } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { ObjectId } from 'mongodb';

export class GetItemRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<GetItemRequest>(req);

      const item = await this.server.inventoryDbManager.getDocument<Item>(
        DatabaseConstants.InventoryDb.Collections.ITEMS,
        { _id: new ObjectId(id) }
      );

      if (!item) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        item,
      });
    } catch (error) {
      throw error;
    }
  }
}

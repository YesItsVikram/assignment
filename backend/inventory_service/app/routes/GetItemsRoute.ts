import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetItemsRequest } from '../models/requests/incoming/GetItemsRequest';
import { Item } from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class GetItemsRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { pageNumber = 1, limit = 10 } = this.getParams<GetItemsRequest>(
        req
      );

      const items = await this.server.inventoryDbManager.getDocuments<Item>(
        DatabaseConstants.InventoryDb.Collections.ITEMS,
        {},
        {
          skip: limit * Math.max(pageNumber, 1) - 1,
          limit,
        }
      );

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        items,
      });
    } catch (error) {
      throw error;
    }
  }
}

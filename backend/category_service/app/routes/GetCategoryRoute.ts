import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  GetCategoryRequest,
  GetCategryResponse,
  ContainerCategory,
  ItemCategory,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';
import { ObjectId } from 'mongodb';

export class GetCategoryRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, collection } = this.getParams<GetCategoryRequest>(req);

      if (collection !== 'CONTAINERS' && collection !== 'ITEMS')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const category:
        | ContainerCategory
        | ItemCategory
        | null = await this.server.categoryDbManager.getDocument<
        ContainerCategory | ItemCategory
      >(
        collection === 'CONTAINERS'
          ? DatabaseConstants.CategoryDb.Collections.CONAINTER_CATEGORY
          : DatabaseConstants.CategoryDb.Collections.ITEM_CATEGORY,
        { _id: new ObjectId(id) }
      );

      if (!category) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      ResponseHandler.SendResponse<GetCategryResponse<typeof category>>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        category,
      });
    } catch (error) {
      throw error;
    }
  }
}

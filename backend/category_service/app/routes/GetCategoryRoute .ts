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

export class GetCategoryRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id, collection } = this.getParams<GetCategoryRequest>(req);

      if (collection !== 'CONTAINERS' && collection !== 'ITEMS')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const category:
        | ContainerCategory
        | ItemCategory = await this.server.categoryDbManager.getDocument<
        ContainerCategory | ItemCategory
      >(
        collection === 'CONTAINERS'
          ? DatabaseConstants.CategoryDb.Collections.CONAINTERS_CATEGORY
          : DatabaseConstants.CategoryDb.Collections.ITEMS_CATEGORY,
        { _id: id }
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

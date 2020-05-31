import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  ContainerCategory,
  ItemCategory,
  GetCategoriesRequest,
  GetCategoriesResponse,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';

export class GetCategoriesRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { collection, pageNumber = 1, limit = 10 } = this.getParams<
        GetCategoriesRequest
      >(req);

      if (collection !== 'CONTAINERS' && collection !== 'ITEMS')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const categories:
        | ContainerCategory[]
        | ItemCategory[]
        | null = await this.server.categoryDbManager.getDocuments<
        ContainerCategory | ItemCategory
      >(
        collection === 'CONTAINERS'
          ? DatabaseConstants.CategoryDb.Collections.CONAINTER_CATEGORY
          : DatabaseConstants.CategoryDb.Collections.ITEM_CATEGORY,
        {},
        { skip: limit * (Math.max(pageNumber, 1) - 1), limit }
      );

      if (!categories) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      ResponseHandler.SendResponse<GetCategoriesResponse<typeof categories[0]>>(
        res,
        {
          ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
          categories,
        }
      );
    } catch (error) {
      throw error;
    }
  }
}

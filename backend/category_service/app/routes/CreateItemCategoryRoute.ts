import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  CreateItemCategoryRequest,
  ItemCategory,
  DocumentData,
  CreateItemCategoryResponse,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class CreateItemCategoryRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const params = this.getParams<CreateItemCategoryRequest>(req);

      const category = await this.createCategory(params);

      ResponseHandler.SendResponse<CreateItemCategoryResponse>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        category,
      });
    } catch (error) {
      throw error;
    }
  }

  private async createCategory({
    schema,
    kind,
  }: CreateItemCategoryRequest): Promise<ItemCategory> {
    const itemCategory: DocumentData<ItemCategory> = {
      kind,
      schema,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.server.categoryDbManager.insertDocument<ItemCategory>(
      DatabaseConstants.CategoryDb.Collections.ITEM_CATEGORY,
      itemCategory
    );
  }
}

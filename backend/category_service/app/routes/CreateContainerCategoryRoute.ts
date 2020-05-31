import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  CreateContainerCategoryRequest,
  DocumentData,
  CreateContainerCategoryResponse,
  ContainerCategory,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';

export class CreateContainerCategoryRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const params = this.getParams<CreateContainerCategoryRequest>(req);

      if (params.canHold !== 'CONTAINERS' && params.canHold !== 'INVENTORY')
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const category = await this.createCategory(params);

      ResponseHandler.SendResponse<CreateContainerCategoryResponse>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        category,
      });
    } catch (error) {
      throw error;
    }
  }

  private async createCategory({
    canHold,
    schema,
    kind,
  }: CreateContainerCategoryRequest): Promise<ContainerCategory> {
    const containerCategory: DocumentData<ContainerCategory> = {
      kind,
      schema,
      canHold,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this.server.categoryDbManager.insertDocument<ContainerCategory>(
      DatabaseConstants.CategoryDb.Collections.CONAINTER_CATEGORY,
      containerCategory
    );
  }
}

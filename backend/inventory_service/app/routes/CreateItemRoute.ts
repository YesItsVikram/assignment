import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  Item,
  CreateItemRequest,
  CreateItemResponse,
  ItemCategory,
  DocumentData,
  CategorySchema,
  InventoryMeta,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { RouteError } from '../errors/RouteError';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class CreateItemRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const params = this.getParams<CreateItemRequest>(req);
      const { categoryId } = params;

      const category = await this.server.categoryService.getCategory(
        categoryId
      );

      if (!category) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const data = this.getItemData(params, category);

      const item = await this.server.inventoryDbManager.insertDocument(
        DatabaseConstants.InventoryDb.Collections.ITEMS,
        data
      );

      await this.updateMeta(categoryId);
      await this.updateMeta('ALL');

      ResponseHandler.SendResponse<CreateItemResponse>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        item,
      });
    } catch (error) {
      throw error;
    }
  }

  private getItemData(
    { details }: CreateItemRequest,
    { schema, _id, kind }: ItemCategory
  ): DocumentData<Item> {
    const data: DocumentData<Item> = {
      category: {
        id: _id.toString(),
        kind,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (details)
      for (const key in schema) {
        if (schema.hasOwnProperty(key)) {
          const { isRequired, type, default: defaultVal } = schema[key];

          const detail = details[key];

          if (detail === undefined) {
            if (isRequired)
              throw new RouteError(
                ResponseTypes.INVALID_REQUEST,
                `REQUIRED PROPERTY: ${key}`
              );

            if (defaultVal !== undefined) data[key] = defaultVal;
          } else {
            if (!this.hasValidType(detail, type))
              throw new RouteError(
                ResponseTypes.INVALID_REQUEST,
                `INVALID TYPE FOR ${key}. EXPECTED ${type}, GOT ${typeof detail}`
              );

            data[key] = detail;
          }
        }
      }

    return data;
  }

  private hasValidType<K extends keyof CategorySchema>(
    data: any,
    type: CategorySchema[K]['type']
  ): boolean {
    if (type === 'array') return Array.isArray(data);

    return typeof data === type;
  }

  private async updateMeta(categoryId: InventoryMeta['_id']) {
    await this.server.inventoryDbManager.updateDocument<InventoryMeta>(
      DatabaseConstants.InventoryDb.Collections.META,
      { _id: categoryId.toString() },
      {
        $setOnInsert: {
          createdAt: new Date(),
          updatedAt: new Date(),
          itemsCount: 1,
        },
        $inc: {
          itemsCount: 1,
        },
        $set: {
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
      }
    );
  }
}

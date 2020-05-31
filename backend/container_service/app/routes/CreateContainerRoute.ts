import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { RouteError } from '../errors/RouteError';
import { ResponseTypes, DatabaseConstants } from '../Constants';
import {
  DocumentData,
  Container,
  CreateContainerRequest,
  CreateContainerResponse,
  ContainerCategory,
  CategorySchema,
  ContainersMeta,
} from '@custom_modules/models';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class CreateContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const params = this.getParams<CreateContainerRequest>(req);
      const { categoryId } = params;

      const category = await this.server.categoryService.getCategory(
        categoryId
      );

      if (!category) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      const data = this.getContainerData(params, category);

      const container = await this.server.containerDbManager.insertDocument(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        data
      );

      await this.updateMeta(categoryId);
      await this.updateMeta('ALL');

      ResponseHandler.SendResponse<CreateContainerResponse>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        container,
      });
    } catch (error) {
      throw error;
    }
  }

  private getContainerData(
    { details }: CreateContainerRequest,
    { kind, schema, _id, canHold }: ContainerCategory
  ): DocumentData<Container> {
    const data: DocumentData<Container> = {
      category: {
        id: _id.toString(),
        kind,
        canHold,
      },
      containerIds: [],
      itemIds: [],
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

  private async updateMeta(categoryId: ContainerCategory['_id']) {
    await this.server.containerDbManager.updateDocument<ContainersMeta>(
      DatabaseConstants.ContainersDb.Collections.META,
      { _id: categoryId.toString() },
      {
        $setOnInsert: {
          createdAt: new Date(),
          updatedAt: new Date(),
          containersCount: 1,
        },
        $inc: {
          containersCount: 1,
        },
      },
      {
        upsert: true,
      }
    );
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  Container,
  DeleteContainerRequest,
  DeleteContainerResponse,
  ContainerCategory,
  ContainersMeta,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';
import { ObjectId } from 'mongodb';

export class DeleteContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<DeleteContainerRequest>(req);

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: new ObjectId(id),
      });
      if (!container || !this.isContainerEmpty(container))
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.server.containerDbManager.deleteDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: new ObjectId(id) }
      );

      await this.updateMeta(container.category.id);
      await this.updateMeta('ALL');

      ResponseHandler.SendResponse<DeleteContainerResponse>(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private isContainerEmpty(container: Container): boolean {
    return (
      (container.canHold === 'CONTAINERS'
        ? container.containerIds
        : container.itemIds
      ).length === 0
    );
  }

  private async updateMeta(categoryId: ContainerCategory['_id']) {
    await this.server.containerDbManager.updateDocument<ContainersMeta>(
      DatabaseConstants.ContainersDb.Collections.META,
      { _id: categoryId.toString() },
      {
        $inc: {
          containersCount: -1,
        },
      }
    );
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { CreateContainerRequest } from '../models/requests/CreateContainterRequest';
import { RouteError } from '../errors/RouteError';
import { ResponseTypes, DatabaseConstants } from '../Constants';
import { DocumentData, Container } from '@custom_modules/models';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class CreateContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const params = this.getParams<CreateContainerRequest>(req);
      const { canHold } = params;

      if (
        canHold !== 'CONTAINERS' &&
        canHold !== 'INVENTORY' &&
        canHold !== 'ALL'
      )
        throw new RouteError(ResponseTypes.INVALID_REQUEST);

      await this.server.containerDbManager.insertDocument(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        this.getContainerData(params)
      );

      ResponseHandler.SendResponse(
        res,
        ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS)
      );
    } catch (error) {
      throw error;
    }
  }

  private getContainerData(
    params: CreateContainerRequest
  ): DocumentData<Container> {
    const { canHold, type } = params;

    return {
      type,
      holds: 'NONE',
      containerIds: [],
      itemIds: [],
      canHold,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

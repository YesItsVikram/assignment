import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import {
  Container,
  GetContainerRequest,
  GetContainerResponse,
} from '@custom_modules/models';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';
import { ObjectId } from 'mongodb';

export class GetContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<GetContainerRequest>(req);

      const container = await this.server.containerDbManager.getDocument<
        Container
      >(DatabaseConstants.ContainersDb.Collections.CONTAINERS, {
        _id: new ObjectId(id),
      });

      if (!container) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      ResponseHandler.SendResponse<GetContainerResponse>(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        container,
      });
    } catch (error) {
      throw error;
    }
  }
}

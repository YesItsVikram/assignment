import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetContainerRequest } from '../models/requests/GetContainerRequest';
import { Container } from '../models/Container';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { RouteError } from '../errors/RouteError';

export class GetContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<GetContainerRequest>(req);

      const container = await this.server.dbManager.getDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: id }
      );

      if (!container) throw new RouteError(ResponseTypes.INVALID_REQUEST);

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        container,
      });
    } catch (error) {
      throw error;
    }
  }
}

import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetContainerRequest } from '../models/requests/GetContainerRequest';
import { Container } from '../models/Container';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class GetContainerRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { id } = this.getParams<GetContainerRequest>(req);

      const container = await this.server.dbManager.getDocument<Container>(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        { _id: id }
      );

      const type =
        container === null
          ? ResponseTypes.INVALID_REQUEST
          : ResponseTypes.SUCCESS;

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(type),
        container,
      });
    } catch (error) {
      throw error;
    }
  }
}

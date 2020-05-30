import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetContainersRequest } from '../models/requests/incoming/GetContainersRequest';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';
import { Container } from '@custom_modules/models';

export class GetContainersRoute extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { pageNumber = 1, limit = 10 } = this.getParams<
        GetContainersRequest
      >(req);

      const containers = await this.server.containerDbManager.getDocuments<
        Container
      >(
        DatabaseConstants.ContainersDb.Collections.CONTAINERS,
        {},
        { skip: limit * (Math.max(pageNumber, 1) - 1), limit }
      );

      ResponseHandler.SendResponse(res, {
        ...ResponseHandler.GetResponseStatus(ResponseTypes.SUCCESS),
        containers,
      });
    } catch (error) {
      throw error;
    }
  }
}

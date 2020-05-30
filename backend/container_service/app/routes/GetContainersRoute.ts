import { BaseRoute } from './BaseRoute';
import { Request, Response } from 'express';
import { GetContainersRequest } from '../models/requests/GetContainersRequest';
import { DatabaseConstants, ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export class Route extends BaseRoute {
  async handleRequest(req: Request, res: Response) {
    try {
      const { pageNumber = 1, limit = 10 } = this.getParams<
        GetContainersRequest
      >(req);

      const containers = await this.server.dbManager.getDocuments(
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

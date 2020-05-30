import { Server } from '../Server';
import { Request, Response } from 'express';
import { logger } from '../utils/Logger';
import { RouteError } from '../errors/RouteError';
import { ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export abstract class BaseRoute {
  private server: Server;

  constructor(protected isGet: boolean, protected routeName: string) {
    if (!Server.Instance) throw new Error(`SERVER NOT INITIALIZED`);
    this.server = Server.Instance;

    if (this.isGet)
      this.server.app.get(this.routeName, (req, res) => this.handle(req, res));
  }

  // Can add authentication, data validation etc
  handle(req: Request, res: Response) {
    this.handleRequest(req, res).catch((err) => {
      logger.error(`ERROR OCCURED IN BaseRoute.handle: `, err);
      this.handleErrorResponse(res, err);
    });
  }

  private handleErrorResponse(res: Response, err: any) {
    const type =
      err instanceof RouteError ? err.type : ResponseTypes.SOMETHING_WENT_WRONG;

    ResponseHandler.SendResponse(res, ResponseHandler.GetResponseStatus(type));
  }

  abstract handleRequest(req: Request, res: Response): Promise<void>;
}

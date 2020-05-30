import { Server } from '../Server';
import { Request, Response } from 'express';
import { logger } from '../utils/Logger';
import { RouteError } from '../errors/RouteError';
import { ResponseTypes } from '../Constants';
import { ResponseHandler } from '../handlers/ResponseHandler';

export abstract class BaseRoute {
  server: Server;

  constructor(protected isGet: boolean, protected routeName: string) {
    if (!Server.Instance) throw new Error(`SERVER NOT INITIALIZED`);
    this.server = Server.Instance;

    if (this.isGet)
      this.server.app.get(this.routeName, (req, res) => this.handle(req, res));
  }

  // Can add authentication, data validation etc
  handle(req: Request, res: Response) {
    const params = this.getParams(req);

    logger.info(
      `BaseRoute.handle for route: ${this.routeName} and params: 
      ${JSON.stringify(params)}`
    );

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

  protected getParams<T = any>(req: Request): T {
    return this.isGet ? req.query : req.body;
  }

  abstract async handleRequest(req: Request, res: Response): Promise<void>;
}

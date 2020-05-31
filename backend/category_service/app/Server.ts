import { Express } from 'express';
import { logger } from '@custom_modules/utils';
import { PORT, ResponseTypes } from './Constants';
import bodyParser from 'body-parser';
import { Factory } from './Factory';
import { CategoryDbManager } from './managers/CategoryDbManager';
import { ResponseHandler } from './handlers/ResponseHandler';
import cors from 'cors';

export class Server {
  static Instance: Server | null = null;

  private constructor(
    public app: Express,
    public categoryDbManager: CategoryDbManager
  ) {}

  static GetInstance(
    app: Express,
    categoryDbManager: CategoryDbManager
  ): Server {
    if (!Server.Instance) Server.Instance = new Server(app, categoryDbManager);
    return Server.Instance;
  }

  async init() {
    try {
      logger.info(`Server.init`);

      await this.categoryDbManager.init();
      logger.info(`Db initialized`);

      this.setMiddlewares();
      Factory.InitAllRoutes();
      logger.info(`Routes initialized`);

      this.app.get('*', (req, res) => {
        ResponseHandler.SendResponse(
          res,
          ResponseHandler.GetResponseStatus(ResponseTypes.INVALID_ROUTE)
        );
      });

      this.app.listen(PORT, () => {
        logger.info(`Server listening on port: ${PORT}`);
      });
    } catch (error) {
      logger.error(`ERROR OCCURED IN Server.init: `, error);
      throw error instanceof Error ? error : new Error(error);
    }
  }

  private setMiddlewares() {
    this.app.options('*', cors({ origin: true, credentials: true }));

    this.app.use(
      cors({
        origin: (origin, callback) => callback(null, true),
      })
    );
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

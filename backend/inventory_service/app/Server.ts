import { Express } from 'express';
import { logger } from '@custom_modules/utils';
import { PORT, ResponseTypes } from './Constants';
import bodyParser from 'body-parser';
import { InventoryDbManager } from './managers/InventoryDbManager';
import { Factory } from './Factory';
import { CategoryService } from './services/CategoryService';
import { ResponseHandler } from './handlers/ResponseHandler';

export class Server {
  static Instance: Server | null = null;

  private constructor(
    public app: Express,
    public inventoryDbManager: InventoryDbManager,
    public categoryService: CategoryService
  ) {}

  static GetInstance(
    app: Express,
    inventoryDbManager: InventoryDbManager,
    categoryService: CategoryService
  ): Server {
    if (!Server.Instance)
      Server.Instance = new Server(app, inventoryDbManager, categoryService);
    return Server.Instance;
  }

  async init() {
    try {
      logger.info(`Server.init`);

      await this.inventoryDbManager.init();
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
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }
}

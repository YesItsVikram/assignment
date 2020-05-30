import { Express } from 'express';
import { logger } from '@custom_modules/utils';
import { PORT } from './Constants';
import bodyParser from 'body-parser';
import { InventoryService } from './services/InventoryService';
import { ContainerDbManager } from './managers/ContainerDbManager';

export class Server {
  static Instance: Server | null = null;

  private constructor(
    public app: Express,
    public containerDbManager: ContainerDbManager,
    public inventoryService: InventoryService
  ) {}

  static GetInstance(
    app: Express,
    dbManager: ContainerDbManager,
    inventoryService: InventoryService
  ): Server {
    if (!Server.Instance)
      Server.Instance = new Server(app, dbManager, inventoryService);
    return Server.Instance;
  }

  async init() {
    try {
      logger.info(`Server.init`);

      await this.containerDbManager.init();
      logger.info(`Db initialized`);

      this.setMiddlewares();

      this.app.get('*', (req, res) => {
        res.send('Invalid Route');
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

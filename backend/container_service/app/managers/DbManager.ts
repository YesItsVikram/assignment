import { MongoClient, Db } from 'mongodb';
import { DatabaseConstants } from '../Constants';
import { logger } from '../utils/Logger';

export class DbManager {
  containersDb: Db | null = null;

  async init() {
    try {
      const client = await MongoClient.connect(
        DatabaseConstants.ContainersDb.URI,
        {
          useNewUrlParser: true,
        }
      );

      this.containersDb = client.db();
    } catch (error) {
      logger.error(`ERROR IN DbManager.init: `, error);
      throw error instanceof Error ? error : new Error(error);
    }
  }
}

import { BaseDbManager } from '@custom_modules/db_manager';
import { MongoClient } from 'mongodb';
import { DatabaseConstants } from '../Constants';
import { logger } from '@custom_modules/utils';

export class ContainerDbManager extends BaseDbManager {
  async init() {
    try {
      const client = await MongoClient.connect(
        DatabaseConstants.ContainersDb.URI,
        {
          useNewUrlParser: true,
        }
      );

      this.db = client.db();
    } catch (error) {
      logger.error(`ERROR IN DbManager.init: `, error);
      throw error instanceof Error ? error : new Error(error);
    }
  }
}

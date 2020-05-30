import { MongoClient, Db } from 'mongodb';
import { DatabaseConstants } from '../Constants';
import { logger } from '../utils/Logger';
import { Document, DocumentData } from '../models/Document';

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

  async insertDocument<T extends Document>(
    collection: string,
    data: Document<T> | DocumentData<T>
  ): Promise<Document<T>> {
    if (!this.containersDb) throw new Error(`DB IS NOT INITIALIZED`);

    const { ops } = await this.containersDb
      .collection(collection)
      .insertOne(data);
    return ops[0];
  }
}

import { MongoClient, Db, UpdateQuery, FindOneOptions } from 'mongodb';
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

  async deleteDocument<T extends Document>(
    collection: string,
    filter: Partial<T>
  ) {
    if (!this.containersDb) throw new Error(`DB IS NOT INITIALIZED`);

    return this.containersDb.collection(collection).deleteOne(filter);
  }

  async getDocument<T extends Document>(
    collection: string,
    filter: Partial<T>
  ): Promise<Document<T> | null> {
    if (!this.containersDb) throw new Error(`DB IS NOT INITIALIZED`);

    return this.containersDb.collection(collection).findOne<T>(filter);
  }

  async getDocuments<T extends Document>(
    collection: string,
    filter: Partial<T>,
    options: FindOneOptions
  ): Promise<Document<T>[]> {
    if (!this.containersDb) throw new Error(`DB IS NOT INITIALIZED`);

    const cursor = this.containersDb
      .collection(collection)
      .find<T>(filter, options);

    return cursor.toArray();
  }

  async updateDocument<T extends Document>(
    collection: string,
    filter: Partial<T>,
    update: UpdateQuery<T>
  ): Promise<Document<T> | null> {
    if (!this.containersDb) throw new Error(`DB IS NOT INITIALIZED`);

    const { value } = await this.containersDb
      .collection(collection)
      .findOneAndUpdate(filter, update, { returnOriginal: false });

    return value || null;
  }
}

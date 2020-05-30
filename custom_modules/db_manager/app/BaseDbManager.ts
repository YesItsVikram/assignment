import { Db, UpdateQuery, FindOneOptions } from 'mongodb';
import { Document, DocumentData } from '@custom_modules/models';

export abstract class BaseDbManager {
  db: Db | null = null;

  /**
   * Initialize the db object
   */
  abstract async init(): Promise<void>;

  async insertDocument<T extends Document>(
    collection: string,
    data: Document<T> | DocumentData<T>
  ): Promise<Document<T>> {
    if (!this.db) throw new Error(`DB IS NOT INITIALIZED`);

    const { ops } = await this.db.collection(collection).insertOne(data);
    return ops[0];
  }

  async deleteDocument<T extends Document>(
    collection: string,
    filter: Partial<T>
  ) {
    if (!this.db) throw new Error(`DB IS NOT INITIALIZED`);

    return this.db.collection(collection).deleteOne(filter);
  }

  async getDocument<T extends Document>(
    collection: string,
    filter: Partial<T>
  ): Promise<Document<T> | null> {
    if (!this.db) throw new Error(`DB IS NOT INITIALIZED`);

    return this.db.collection(collection).findOne<T>(filter);
  }

  async getDocuments<T extends Document>(
    collection: string,
    filter: Partial<T>,
    options: FindOneOptions
  ): Promise<Document<T>[]> {
    if (!this.db) throw new Error(`DB IS NOT INITIALIZED`);

    const cursor = this.db.collection(collection).find<T>(filter, options);

    return cursor.toArray();
  }

  async updateDocument<T extends Document>(
    collection: string,
    filter: Partial<T>,
    update: UpdateQuery<T>
  ): Promise<Document<T> | null> {
    if (!this.db) throw new Error(`DB IS NOT INITIALIZED`);

    if (!update.$set) update.$set = {};
    update.$set = { ...update.$set, updatedAt: new Date() };

    const { value } = await this.db
      .collection(collection)
      .findOneAndUpdate(filter, update, { returnOriginal: false });

    return value || null;
  }
}

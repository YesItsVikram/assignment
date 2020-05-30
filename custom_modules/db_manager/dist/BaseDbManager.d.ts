import { Db, UpdateQuery, FindOneOptions } from 'mongodb';
import { Document, DocumentData } from '@custom_modules/models';
export declare abstract class BaseDbManager {
    db: Db | null;
    /**
     * Initialize the db object
     */
    abstract init(): Promise<void>;
    insertDocument<T extends Document>(collection: string, data: Document<T> | DocumentData<T>): Promise<Document<T>>;
    deleteDocument<T extends Document>(collection: string, filter: Partial<T>): Promise<import("mongodb").DeleteWriteOpResultObject>;
    getDocument<T extends Document>(collection: string, filter: Partial<T>): Promise<Document<T> | null>;
    getDocuments<T extends Document>(collection: string, filter: Partial<T>, options: FindOneOptions): Promise<Document<T>[]>;
    updateDocument<T extends Document>(collection: string, filter: Partial<T>, update: UpdateQuery<T>): Promise<Document<T> | null>;
}

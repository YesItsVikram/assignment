import { Optional } from './Custom';
import { ObjectId, ObjectID } from 'mongodb';
export declare type Document<T extends {} = {}> = T & {
    _id: string | ObjectID | ObjectId;
    createdAt: Date;
    updatedAt: Date;
};
export declare type DocumentData<T extends {} = {}> = Optional<Document<T>, '_id'>;

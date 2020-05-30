import { Optional } from './Custom';
import { ObjectId, ObjectID } from 'mongodb';

export type Document<T extends {} = {}> = T & {
  _id: string | ObjectID | ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentData<T extends {} = {}> = Optional<Document<T>, '_id'>;

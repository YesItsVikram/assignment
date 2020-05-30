import { Optional } from './Custom';
export declare type Document<T extends {} = {}> = T & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};
export declare type DocumentData<T extends {} = {}> = Optional<Document<T>, '_id'>;

export type Document<T extends {} = {}> = T & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type DocumentData<T extends {} = {}> = Optional<Document<T>, '_id'>;

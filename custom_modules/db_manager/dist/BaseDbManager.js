"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDbManager = void 0;
class BaseDbManager {
    constructor() {
        this.db = null;
    }
    async insertDocument(collection, data) {
        if (!this.db)
            throw new Error(`DB IS NOT INITIALIZED`);
        const { ops } = await this.db.collection(collection).insertOne(data);
        return ops[0];
    }
    async deleteDocument(collection, filter) {
        if (!this.db)
            throw new Error(`DB IS NOT INITIALIZED`);
        return this.db.collection(collection).deleteOne(filter);
    }
    async getDocument(collection, filter) {
        if (!this.db)
            throw new Error(`DB IS NOT INITIALIZED`);
        return this.db.collection(collection).findOne(filter);
    }
    async getDocuments(collection, filter, options) {
        if (!this.db)
            throw new Error(`DB IS NOT INITIALIZED`);
        const cursor = this.db.collection(collection).find(filter, options);
        return cursor.toArray();
    }
    async updateDocument(collection, filter, update) {
        if (!this.db)
            throw new Error(`DB IS NOT INITIALIZED`);
        if (!update.$set)
            update.$set = {};
        update.$set = { ...update.$set, updatedAt: new Date() };
        const { value } = await this.db
            .collection(collection)
            .findOneAndUpdate(filter, update, { returnOriginal: false });
        return value || null;
    }
}
exports.BaseDbManager = BaseDbManager;

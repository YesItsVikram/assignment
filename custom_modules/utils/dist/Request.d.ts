/// <reference types="node" />
import { RequestOptions } from 'https';
export declare class Request {
    static HttpRequest<T>(reqOptions: RequestOptions, reqData: any): Promise<T>;
    static HttpsRequest<T>(reqOptions: RequestOptions, reqData: any): Promise<T>;
    static getQueryParamsFromObject(obj: any): string;
}

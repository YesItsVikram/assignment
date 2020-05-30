/// <reference types="node" />
import { RequestOptions } from 'https';
import { URL } from 'url';
export { RequestOptions } from 'https';
export declare class Request {
    static HttpRequest<T>(url: string | URL, reqOptions: RequestOptions, reqData?: any): Promise<T>;
    static HttpsRequest<T>(url: string | URL, reqOptions: RequestOptions, reqData?: any): Promise<T>;
    static getQueryParamsFromObject(obj: any): string;
}

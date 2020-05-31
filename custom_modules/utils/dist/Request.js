"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const https_1 = require("https");
const http_1 = require("http");
const Logger_1 = require("./Logger");
class Request {
    static HttpRequest(url, reqOptions, reqData = {}) {
        return new Promise((resolve, reject) => {
            try {
                Logger_1.logger.info('Request.HttpRequest');
                reqOptions.timeout = 10000;
                reqOptions.headers = {
                    ...reqOptions.headers,
                    'content-type': 'application/json',
                };
                Logger_1.logger.info(`Url: ${url}, Request options: ${JSON.stringify(reqOptions)}`);
                const httpReq = http_1.request(url, reqOptions, (res) => {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunks) => {
                        data += chunks;
                    });
                    res.on('end', () => {
                        try {
                            Logger_1.logger.info('Data on response: ', data);
                            const jsonData = JSON.parse(data.toString());
                            resolve(jsonData);
                        }
                        catch (err) {
                            return reject(err);
                        }
                    });
                });
                httpReq.on('timeout', () => {
                    Logger_1.logger.error('TIMED OUT FOR REQUEST');
                    return reject(new Error('TIMED OUT FOR REQUEST'));
                });
                httpReq.on('error', (error) => {
                    reject(error);
                });
                if (reqOptions.method === 'POST') {
                    Logger_1.logger.info('Data to request: ', JSON.stringify(reqData));
                    httpReq.write(JSON.stringify(reqData));
                }
                httpReq.end();
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    static HttpsRequest(url, reqOptions, reqData = {}) {
        return new Promise((resolve, reject) => {
            try {
                Logger_1.logger.info('Request.HttpsRequest');
                reqOptions.timeout = 10000;
                reqOptions.headers = {
                    ...reqOptions.headers,
                    'content-type': 'application/json',
                };
                Logger_1.logger.info(`Url: ${url}, Request options: ${JSON.stringify(reqOptions)}`);
                const httpsReq = https_1.request(url, reqOptions, (res) => {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunks) => {
                        data += chunks;
                    });
                    res.on('end', () => {
                        try {
                            Logger_1.logger.info('Data on response: ', data);
                            const jsonData = JSON.parse(data.toString());
                            resolve(jsonData);
                        }
                        catch (err) {
                            return reject(err);
                        }
                    });
                });
                httpsReq.on('timeout', () => {
                    Logger_1.logger.error('TIMED OUT FOR REQUEST');
                    return reject(new Error('TIMED OUT FOR REQUEST'));
                });
                httpsReq.on('error', (error) => {
                    reject(error);
                });
                if (reqOptions.method === 'POST') {
                    Logger_1.logger.info('Data to request: ', JSON.stringify(reqData));
                    httpsReq.write(JSON.stringify(reqData));
                    httpsReq.end();
                }
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    static getQueryParamsFromObject(obj) {
        let query = '?';
        for (const [key, val] of Object.entries(obj)) {
            query += `${key}=${val}&`;
        }
        return query.substring(0, query.length - 1);
    }
}
exports.Request = Request;

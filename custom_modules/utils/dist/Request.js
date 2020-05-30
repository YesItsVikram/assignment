"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
const https_1 = require("https");
const http_1 = require("http");
const Logger_1 = require("./Logger");
class Request {
    static HttpRequest(reqOptions, reqData) {
        return new Promise((resolve, reject) => {
            try {
                Logger_1.logger.info('Request.HttpRequest');
                reqOptions.timeout = 10000;
                Logger_1.logger.info(`Request options: ${JSON.stringify(reqOptions)}`);
                const httpReq = http_1.request(reqOptions, (res) => {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunks) => {
                        data += chunks;
                    });
                    res.on('end', () => {
                        try {
                            Logger_1.logger.info('data on response: ', data);
                            const jsonData = JSON.parse(data.toString());
                            resolve(jsonData);
                        }
                        catch (err) {
                            return reject(err);
                        }
                    });
                });
                Logger_1.logger.info('Data to request: ', JSON.stringify(reqData));
                httpReq.write(JSON.stringify(reqData));
                httpReq.on('timeout', () => {
                    Logger_1.logger.error('TIMED OUT FOR REQUEST');
                    return reject(new Error('TIMED OUT FOR REQUEST'));
                });
                httpReq.on('error', (error) => {
                    reject(error);
                });
                httpReq.end();
            }
            catch (error) {
                return reject(error);
            }
        });
    }
    static HttpsRequest(reqOptions, reqData) {
        return new Promise((resolve, reject) => {
            try {
                Logger_1.logger.info('Request.HttpsRequest');
                reqOptions.timeout = 10000;
                Logger_1.logger.info(`Request options: ${JSON.stringify(reqOptions)}`);
                const httpsReq = https_1.request(reqOptions, (res) => {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunks) => {
                        data += chunks;
                    });
                    res.on('end', () => {
                        try {
                            Logger_1.logger.info('data on response: ', data);
                            const jsonData = JSON.parse(data.toString());
                            resolve(jsonData);
                        }
                        catch (err) {
                            return reject(err);
                        }
                    });
                });
                Logger_1.logger.info('Data to request: ', JSON.stringify(reqData));
                httpsReq.write(JSON.stringify(reqData));
                httpsReq.on('timeout', () => {
                    Logger_1.logger.error('TIMED OUT FOR REQUEST');
                    return reject(new Error('TIMED OUT FOR REQUEST'));
                });
                httpsReq.on('error', (error) => {
                    reject(error);
                });
                httpsReq.end();
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
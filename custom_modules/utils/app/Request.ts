import { RequestOptions, request as httpsRequest } from 'https';
import { request as httpRequest } from 'http';
import { logger } from './Logger';
import { URL } from 'url';

export { RequestOptions } from 'https';

export class Request {
  static HttpRequest<T>(
    url: string | URL,
    reqOptions: RequestOptions,
    reqData: any = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        logger.info('Request.HttpRequest');

        reqOptions.timeout = 10000;

        logger.info(
          `Url: ${url}, Request options: ${JSON.stringify(reqOptions)}`
        );

        const httpReq = httpRequest(url, reqOptions, (res) => {
          res.setEncoding('utf8');

          let data = '';
          res.on('data', (chunks) => {
            data += chunks;
          });

          res.on('end', () => {
            try {
              logger.info('data on response: ', data);

              const jsonData = JSON.parse(data.toString());
              resolve(jsonData);
            } catch (err) {
              return reject(err);
            }
          });
        });

        logger.info('Data to request: ', JSON.stringify(reqData));

        httpReq.write(JSON.stringify(reqData));

        httpReq.on('timeout', () => {
          logger.error('TIMED OUT FOR REQUEST');
          return reject(new Error('TIMED OUT FOR REQUEST'));
        });

        httpReq.on('error', (error) => {
          reject(error);
        });

        httpReq.end();
      } catch (error) {
        return reject(error);
      }
    });
  }

  static HttpsRequest<T>(
    url: string | URL,
    reqOptions: RequestOptions,
    reqData: any = {}
  ): Promise<T> {
    return new Promise((resolve, reject) => {
      try {
        logger.info('Request.HttpsRequest');

        reqOptions.timeout = 10000;

        logger.info(
          `Url: ${url}, Request options: ${JSON.stringify(reqOptions)}`
        );

        const httpsReq = httpsRequest(url, reqOptions, (res) => {
          res.setEncoding('utf8');

          let data = '';
          res.on('data', (chunks) => {
            data += chunks;
          });

          res.on('end', () => {
            try {
              logger.info('data on response: ', data);

              const jsonData = JSON.parse(data.toString());
              resolve(jsonData);
            } catch (err) {
              return reject(err);
            }
          });
        });

        logger.info('Data to request: ', JSON.stringify(reqData));

        httpsReq.write(JSON.stringify(reqData));

        httpsReq.on('timeout', () => {
          logger.error('TIMED OUT FOR REQUEST');
          return reject(new Error('TIMED OUT FOR REQUEST'));
        });

        httpsReq.on('error', (error) => {
          reject(error);
        });

        httpsReq.end();
      } catch (error) {
        return reject(error);
      }
    });
  }

  static getQueryParamsFromObject(obj: any): string {
    let query = '?';

    for (const [key, val] of Object.entries(obj)) {
      query += `${key}=${val}&`;
    }
    return query.substring(0, query.length - 1);
  }
}

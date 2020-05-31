import { ResponseTypes } from '../Constants';
import { Status } from '@custom_modules/models';
import { Response } from 'express';
import { logger } from '@custom_modules/utils';

export class ResponseHandler {
  static GetResponseStatus(type: ResponseTypes): { status: Status } {
    const status: Status = {
      resp_code: 500,
      resp_message: 'SOMETHING WENT WRONG',
    };

    switch (type) {
      case ResponseTypes.SUCCESS:
        status.resp_code = 200;
        status.resp_message = 'SUCCESS';
        break;

      case ResponseTypes.INVALID_ROUTE:
        status.resp_code = 404;
        status.resp_message = 'INVALID ROUTE';
        break;

      case ResponseTypes.INVALID_REQUEST:
        status.resp_code = 501;
        status.resp_message = 'INVALID REQUEST';
        break;
    }

    return { status };
  }

  // Can add encryption, check data format etc
  static SendResponse<T = any>(res: Response, data: T) {
    logger.info(`Data to send: ${JSON.stringify(data)}`);
    res.send(data);
  }
}

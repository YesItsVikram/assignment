import { ResponseTypes } from '../Constants';

export class RouteError extends Error {
  constructor(
    public type: ResponseTypes = ResponseTypes.SOMETHING_WENT_WRONG,
    message?: string
  ) {
    super(message);
    this.name = 'RouteError';
  }
}

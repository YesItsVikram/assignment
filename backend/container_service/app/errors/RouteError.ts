import { ResponseTypes } from '../Constants';

export class RouteError extends Error {
  constructor(public type: ResponseTypes) {
    super();
  }
}

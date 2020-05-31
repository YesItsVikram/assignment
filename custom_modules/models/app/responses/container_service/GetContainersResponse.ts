import { BaseResponse } from '../BaseResponse';
import { Container } from '../../Container';

export interface GetContainersResponse extends BaseResponse {
  containers: Container[];
}

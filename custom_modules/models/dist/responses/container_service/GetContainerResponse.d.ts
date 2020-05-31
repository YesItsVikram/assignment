import { BaseResponse } from '../BaseResponse';
import { Container } from '../../Container';
export interface GetContainerResponse extends BaseResponse {
    container: Container;
}

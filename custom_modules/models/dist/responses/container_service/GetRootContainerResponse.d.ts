import { BaseResponse } from '../BaseResponse';
import { Container } from '../../Container';
export interface GetRootContainerResponse extends BaseResponse {
    container: Container;
}

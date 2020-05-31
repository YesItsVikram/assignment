import { BaseResponse } from '../BaseResponse';
import { Container } from '../../Container';
export interface CreateContainerResponse extends BaseResponse {
    container: Container;
}

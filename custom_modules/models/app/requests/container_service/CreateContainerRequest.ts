import { ContainerDetails } from '../../Container';

export interface CreateContainerRequest {
  categoryId: string;
  details?: ContainerDetails;
}

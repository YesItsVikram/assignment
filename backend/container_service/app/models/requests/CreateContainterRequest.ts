import { Container } from '../Container';

export type CreateContainerRequest = Pick<Container, 'canHold' | 'type'>;

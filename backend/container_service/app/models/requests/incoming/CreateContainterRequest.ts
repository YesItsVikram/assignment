import { Container } from '@custom_modules/models';

export type CreateContainerRequest = Pick<Container, 'canHold' | 'type'>;

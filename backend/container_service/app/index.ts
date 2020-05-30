import { logger } from './utils/Logger';
import { Factory } from './Factory';

const server = Factory.GetServer();

try {
  server.init();
  logger.info(`Server initialized successfully`);
} catch (error) {
  logger.error(`ERROR INITIALIZING SERVER:`, error);
  process.exit(1);
}

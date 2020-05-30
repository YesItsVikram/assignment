import { logger } from '@custom_modules/utils';
import { Factory } from './Factory';

const server = Factory.GetServer();

(async function () {
  try {
    await server.init();
    logger.info(`Server initialized successfully`);
  } catch (error) {
    logger.error(`ERROR INITIALIZING SERVER:`, error);
    process.exit(1);
  }
})();

import dotenv from 'dotenv';
import logger from '../services/logger';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'development') {
  connectionString = process.env.DATABASE_DEV_URL;
} else if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_TEST_URL;
} else {
  connectionString = process.env.DATABASE_PRODUCTION_URL;
}

logger.info(`Node Environment: ${process.env.NODE_ENV}`);
export default connectionString;

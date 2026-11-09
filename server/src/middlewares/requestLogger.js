import morgan from 'morgan';
import config from '../config/env.js';

export const requestLogger = morgan(config.isProduction ? 'combined' : 'dev');

export default requestLogger;

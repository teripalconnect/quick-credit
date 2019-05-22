import winston from 'winston';
import express from 'express';
import morganLogger from 'morgan';
import bodyParser from 'body-parser';
import routes from './api/routes';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
  ]
});

const app = express();

app.use(morganLogger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.get('/', (req, res) => res.status(200).json({
  message: 'Welcome to Quick Credit!'
}));

app.use('*', (req, res) => res.status(404).json({
  message: 'Route not found',
}));

// handling all the request errors
app.use((err, req, res, next) => {
  logger.info(err.stack);
  const { statusCode, errorResponse } = err;

  next();
  return res.status(statusCode).json(errorResponse);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  logger.info(`app listening on port ${port}`);
});

export default app;

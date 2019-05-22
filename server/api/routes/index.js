import { Router } from 'express';
import authRouter from './auth';
import loansRouter from './loans';
import usersRouter from './users';

const routes = Router();

routes.use('/auth', authRouter);
routes.use('/loans', loansRouter);
routes.use('/users', usersRouter);


export default routes;

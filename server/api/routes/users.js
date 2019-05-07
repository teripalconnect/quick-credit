import { Router } from 'express';
import LoansController from '../controllers/loans';
import UsersController from '../controllers/users';
import tokenVerification from '../middlewares/tokenVerification';
import verifyUser from '../middlewares/verifyUser';
import verifyAdmin from '../middlewares/verifyAdmin';

const usersRouter = Router();

const { getAllUserLoans } = LoansController;
const { userVerify } = UsersController;

usersRouter.get('/:userId/loans', tokenVerification, verifyUser, getAllUserLoans);
usersRouter.patch('/:userId/verify', tokenVerification, verifyAdmin, userVerify);

export default usersRouter;

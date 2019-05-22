import { Router } from 'express';
import UsersController from '../controllers/users';
import userSignupValidator from '../middlewares/userSignupValidator';
import userSigninValidator from '../middlewares/userSigninValidator';


const authRouter = Router();

authRouter.post('/signup', userSignupValidator, UsersController.userSignup);
authRouter.post('/signin', userSigninValidator, UsersController.userSignin);

export default authRouter;

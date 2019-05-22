import { Router } from 'express';
import LoansController from '../controllers/loans';
import RepaymentsController from '../controllers/repayments';
import tokenVerification from '../middlewares/tokenVerification';
import loanRequestValidator from '../middlewares/loanRequestValidator';
import verifyAdmin from '../middlewares/verifyAdmin';

const loansRouter = Router();

const {
  createLoanRequest,
  getAllLoans,
  getSingleLoan,
  changeLoanStatus,
} = LoansController;

const { getRepaymentsForALoan } = RepaymentsController;

loansRouter.get('/',
  tokenVerification,
  verifyAdmin,
  getAllLoans);

loansRouter.post('/',
  tokenVerification,
  loanRequestValidator,
  createLoanRequest);

loansRouter.get('/:loanId',
  tokenVerification,
  getSingleLoan);

loansRouter.patch('/:loanId',
  tokenVerification,
  verifyAdmin,
  changeLoanStatus);

loansRouter.get('/:loanId/repayments',
  tokenVerification,
  getRepaymentsForALoan);

export default loansRouter;

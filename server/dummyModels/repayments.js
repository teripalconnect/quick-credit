import uuid from 'uuidv4';
import loans from './loans';

const repayments = [
  {
    id: uuid(),
    loanId: loans[0].id,
    createdOn: new Date(),
    amount: 5000,
    monthlyInstallment: loans[0].paymentInstallment
  },
  {
    id: uuid(),
    loanId: loans[1].id,
    createdOn: new Date(),
    amount: 7500,
    monthlyInstallment: loans[1].paymentInstallment
  },
  {
    id: uuid(),
    loanId: loans[0].id,
    createdOn: new Date(),
    amount: 5500,
    monthlyInstallment: loans[0].paymentInstallment
  },
];

export default repayments;

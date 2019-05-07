import uuid from 'uuidv4';
import users from './users';

const loans = [
  {
    id: uuid(),
    email: 'quickuser1@quick-cred.test',
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: true,
    status: 'approved',
    interest: 500,
    userId: users[0].id,
    balance: 0,
    createdOn: new Date(),
  },
  {
    id: uuid(),
    email: 'quickuser3@quick-cred.test',
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: false,
    status: 'approved',
    interest: 500,
    userId: users[2].id,
    balance: 3000,
    createdOn: new Date(),
  }
];

export default loans;

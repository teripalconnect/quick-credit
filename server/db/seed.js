import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserModel from '../models/User';
import LoanModel from '../models/Loan';
import RepaymentModel from '../models/Repayment';

dotenv.config();

const User = new UserModel();
const Loan = new LoanModel();
const Repayment = new RepaymentModel();

const seedDatabase = async () => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  const users = [
    {
      email: 'quickuser1@quick-cred.test',
      firstName: 'Rita',
      lastName: 'Smith',
      password: bcrypt.hashSync('dummypass123', salt),
      address: '5, Smith Road, Smith Town',
      isAdmin: false,
      status: 'verified'
    },
    {
      email: 'quickuser2@quick-cred.test',
      firstName: 'Jane',
      lastName: 'Dough',
      password: bcrypt.hashSync('dummypass1234', salt),
      address: '7, Smith Road, Smith Town',
      isAdmin: true,
      status: 'verified'
    },
    {
      email: 'quickuser3@quick-cred.test',
      firstName: 'Rita',
      lastName: 'Smith',
      password: bcrypt.hashSync('dummypass123', salt),
      address: '5, Smith Road, Smith Town',
      isAdmin: false,
      status: 'verified'
    },
  ];

  const seedUsers = users.map(async (userData) => {
    const newUser = await User.create(userData);
    return newUser;
  });

  // wait for all queries to resolve for the call to create users
  const insertedUsers = await Promise.all(seedUsers);

  const loan1 = await Loan.create({
    email: insertedUsers[0].email,
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: true,
    status: 'approved',
    interest: 500,
    userId: insertedUsers[0].id,
    balance: 0,
  });

  const loan2 = await Loan.create({
    email: insertedUsers[2].email,
    tenor: 2,
    amount: 10000,
    paymentInstallment: 10500 / 2,
    repaid: false,
    status: 'approved',
    interest: 500,
    userId: insertedUsers[2].id,
    balance: 3000,
  });

  const insertedLoans = [loan1, loan2];

  await Repayment.create({
    loanId: insertedLoans[0].id,
    amount: 5000,
    monthlyInstallment: insertedLoans[0].paymentInstallment
  });

  await Repayment.create({
    loanId: insertedLoans[1].id,
    amount: 7500,
    monthlyInstallment: insertedLoans[1].paymentInstallment
  });

  await Repayment.create({
    loanId: insertedLoans[0].id,
    amount: 5500,
    monthlyInstallment: insertedLoans[0].paymentInstallment
  });
};

export default seedDatabase;
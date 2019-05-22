import uuid from 'uuidv4';
import bcrypt from 'bcryptjs';

const users = [
  {
    id: uuid(),
    email: 'quickuser1@quick-cred.test',
    firstName: 'Rita',
    lastName: 'Smith',
    password: bcrypt.hashSync('dummypass123', process.env.SALT_ROUNDS),
    address: '5, Smith Road, Smith Town',
    isAdmin: false,
    status: 'verified'
  },
  {
    id: uuid(),
    email: 'quickuser2@quick-cred.test',
    firstName: 'Jane',
    lastName: 'Dough',
    password: bcrypt.hashSync('dummypass1234', process.env.SALT_ROUNDS),
    address: '7, Smith Road, Smith Town',
    isAdmin: true,
    status: 'verified'
  },
  {
    id: uuid(),
    email: 'quickuser3@quick-cred.test',
    firstName: 'Rita',
    lastName: 'Smith',
    password: bcrypt.hashSync('dummypass123', process.env.SALT_ROUNDS),
    address: '5, Smith Road, Smith Town',
    isAdmin: false,
    status: 'verified'
  },
];

export default users;

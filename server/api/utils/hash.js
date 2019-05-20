import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
  return bcrypt.hashSync(password, salt);
};

export default hashPassword;

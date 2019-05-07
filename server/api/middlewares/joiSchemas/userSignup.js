import joi from 'joi';

const email = joi.string().trim().strict().email()
  .min(8)
  .max(60)
  .required();

// password can be alphanumeric with [@] [.] [+] [-] eg "alph23@.+-"
const password = joi.string().trim().regex(/^[a-zA-Z 0-9@.+-]*$/)
  .min(6)
  .max(40)
  .required();
const firstName = joi.string().trim().strict().min(1)
  .max(50)
  .required();
const lastName = joi.string().trim().strict().min(1)
  .max(50)
  .required();
const address = joi.string().trim().strict().min(5)
  .max(100)
  .required();

const userSignupSchema = {
  email,
  password,
  firstName,
  lastName,
  address
};

export default userSignupSchema;

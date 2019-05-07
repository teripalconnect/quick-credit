import joi from 'joi';

const email = joi.string().trim().strict().email()
  .min(8)
  .max(60)
  .required();

const password = joi.string().trim().strict().min(8)
  .max(50)
  .required();

const userSigninSchema = {
  email,
  password
};

export default userSigninSchema;

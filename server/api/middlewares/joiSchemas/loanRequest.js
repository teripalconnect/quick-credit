import joi from 'joi';

const amount = joi.number().positive().min(1000)
  .max(1000000)
  .required();

const tenor = joi.number().positive().min(1).max(12)
  .required();

const loanRequestSchema = {
  amount,
  tenor,
};

export default loanRequestSchema;

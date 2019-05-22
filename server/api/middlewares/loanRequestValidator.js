import joi from 'joi';
import loanRequestSchema from './joiSchemas/loanRequest';
import HttpException from '../utils/HttpException';

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const loanRequestValidator = async (req, res, next) => {
  try {
    await joi.validate(req.body, loanRequestSchema);
    next();
  } catch (error) {
    return next(new HttpException('UnprocessableEntity', error.details[0].message));
  }
};


export default loanRequestValidator;

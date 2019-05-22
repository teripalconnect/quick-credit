import joi from 'joi';
import userSignupJoiSchema from './joiSchemas/userSignup';
import HttpException from '../utils/HttpException';


/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const userSignupValidator = async (req, res, next) => {
  try {
    await joi.validate(req.body, userSignupJoiSchema);
    next();
  } catch (error) {
    return next(new HttpException('UnprocessableEntity', error.details[0].message));
  }
};


export default userSignupValidator;

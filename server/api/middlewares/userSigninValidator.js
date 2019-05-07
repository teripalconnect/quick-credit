import joi from 'joi';
import userSigninJoiSchema from './joiSchemas/userSignin';
import HttpException from '../utils/HttpException';

/**
 * @param  {Object} req - the request object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const userSigninValidator = async (req, res, next) => {
  try {
    await joi.validate(req.body, userSigninJoiSchema);
    next();
  } catch (error) {
    return next(new HttpException('UnprocessableEntity', error.details[0].message));
  }
};

export default userSigninValidator;

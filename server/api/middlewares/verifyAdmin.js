import HttpException from '../utils/HttpException';

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {*} - returns void or next()
 */
const verifyAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(new HttpException('Unauthorised'));
  }
  next();
};

export default verifyAdmin;

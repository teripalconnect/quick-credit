import HttpException from '../utils/HttpException';

/**
 * @param  {Object} req - the request Object
 * @param  {Object} res - the response object
 * @param  {Function} next - switch to the next route middleware
 * @return {JsonResponse} - the json response
 */
const verifyUser = (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(new HttpException('Unauthorised'));
  }
  next();
};

export default verifyUser;

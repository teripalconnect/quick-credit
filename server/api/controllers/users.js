import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import users from '../../dummyModels/users';
import UserModel from '../../models/User';
import hashPassword from '../utils/hash';

dotenv.config();

const User = new UserModel();
/**
 * @export
 */
class UsersController {
  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignup(req, res) {
    const {
      email,
      password,
      firstName,
      lastName,
      address
    } = req.body;

    const newUser = await User.create({
      email,
      password: hashPassword(password),
      firstName,
      lastName,
      address,
      isAdmin: false,
      status: 'unverified'
    });

    delete newUser.password;
    return res.status(201).json({
      status: 201,
      data: newUser
    });
  }


  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userSignin(req, res) {
    const { email, password } = req.body;
    const user = await User.getByField('email', email);

    if (!user) {
      return res.status(401).json({
        status: 401,
        message: 'wrong login data'
      });
    }

    const isCorrectPassword = await bcrypt.compareSync(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json({
        status: 401,
        message: 'wrong login data'
      });
    }

    const expiryTime = 60 * 60; // 1 hour

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: expiryTime }
    );

    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      token
    };

    return res.status(200).json({
      status: 200,
      message: 'login successful',
      data
    });
  }

  /**
   * @param  {Object} req - the request object
   * @param  {Object} res - the response object
   * @return {JsonResponse} - the json response
   */
  static async userVerify(req, res) {
    const { userId } = req.params;
    const user = users.find(item => item.id === userId);

    user.status = 'verified';

    return res.status(200).json({
      status: 200,
      data: user
    });
  }
}

export default UsersController;

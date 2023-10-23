import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AuthError, BadRequestError } from '../utils/errors.js';
import config from '../utils/config.js';

export async function login(req, res, next) {
  try {
    const { body } = req;

    if (![body.email, body.password].every(Boolean)) {
      throw new BadRequestError('A required field is missing');
    }

    const user = await User.findOne({ where: { email: body.email } });

    if (!user) {
      throw new AuthError(401, 'Invalid login credentials provided');
    }

    const passwordIsCorrect = await bcrypt.compare(body.password, user.passwordHash);

    if (!passwordIsCorrect) {
      throw new AuthError(401, 'Invalid login credentials provided');
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: config.TOKEN_EXPIRATION });

    res.json({
      token,
      id: user.id,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    next(error);
  }
}

export async function signup(req, res, next) {
  try {
    const { body } = req;

    if (![body.email, body.password, body.userType].every(Boolean)) {
      throw new BadRequestError('A required field is missing');
    }

    if (!config.USER_TYPES.includes(body.userType)) {
      throw new BadRequestError('Invalid user type provided');
    }

    const duplicateUser = await User.findOne({ where: { email: body.email } });

    if (duplicateUser) {
      throw new AuthError(409, 'A user with this email already exists');
    }

    const passwordHash = await bcrypt.hash(body.password, 12);

    const user = await User.create({ email: body.email, userType: body.userType, passwordHash });

    const payload = { id: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: config.TOKEN_EXPIRATION });

    res.status(201).json({
      token,
      id: user.id,
      email: user.email,
      userType: user.userType,
    });
  } catch (error) {
    next(error);
  }
}

import jwt from 'jsonwebtoken';
import User from '../models/User.js';

async function authenticateUser(req, res, next) {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer')) {
      req.user = null;
      return next();
    }

    // Authorization header will be in the format -> Bearer <token>
    const token = authHeader.split(' ')[1];
    const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decodedPayload.id } });

    if (!user) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export default authenticateUser;

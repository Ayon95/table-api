import { DataTypes } from 'sequelize';
import sequelize from '../services/db.js';
import config from '../../utils/config.js';

const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: 'Invalid email provided' },
    },
  },
  userType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [config.USER_TYPES],
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

await User.sync();

export default User;

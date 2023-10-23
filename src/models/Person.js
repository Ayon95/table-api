import { DataTypes } from 'sequelize';
import sequelize from '../services/db.js';

const Person = sequelize.define('Person', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registeredDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  isPrivate: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

await Person.sync();

export default Person;

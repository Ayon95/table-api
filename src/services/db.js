import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL);

try {
  await sequelize.authenticate();
  console.log('Connected to database successfully!');
} catch (error) {
  console.error(error);
}

export default sequelize;

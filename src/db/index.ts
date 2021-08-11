import './models';
import { sequelize } from './setup';

export const initSql = async () => {
  await sequelize.sync({ logging: console.log }).catch(console.error);

  try {
    sequelize.authenticate().then(() => console.log('DB Working'));
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

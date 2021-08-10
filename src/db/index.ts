import { Lot } from './models';
import { sequelize } from './setup';

export const initSql = async () => {
  await sequelize.sync({ logging: console.log }).finally(console.warn);

  Lot.findAll().then(console.log);

  try {
    sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

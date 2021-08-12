import './models';
import { sequelize } from './setup';

export const initSql = async () => {
  sequelize
    .authenticate()
    .then(() =>
      console.log(
        '------------------------- DB Working -------------------------',
      ),
    )
    .then(() => sequelize.sync({ logging: console.log, force: false }))
    .catch((e) => {
      console.error('Unable to connect to the database:', e);
      throw e;
    });
};

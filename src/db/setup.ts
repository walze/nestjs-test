import { config, ENV } from 'config';
import { Sequelize } from 'sequelize';

const { database, dialect, password, username }: any = config[ENV];

export const sequelize = new Sequelize({
  host: 'db',
  database,
  dialect,
  password,
  username,
});

import { config, ENV } from 'config';
import { Sequelize } from 'sequelize';

const {
  database,
  dialect,
  password,
  username,
  host = process.env['HOST'],
} = config[ENV];

export const sequelize = new Sequelize({
  host: host || 'db',
  database,
  dialect,
  password,
  username,
});

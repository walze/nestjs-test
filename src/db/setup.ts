import {Config, environments} from 'typings'

import {Sequelize} from 'sequelize'

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config = require('../../sql.config.js') as Config
export const ENV = process.env['NODE_ENV'] as environments

const {
  database,
  dialect,
  password,
  username,
  host = process.env['HOST'],
} = config[ENV]

export const sequelize = new Sequelize({
  database,
  dialect,
  host: host || 'db',
  password,
  username,
})

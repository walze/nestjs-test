import {Sequelize} from 'sequelize'
import {config} from 'dotenv'

config()

const {
  DB_USER: username,
  DB_PW: password,
  DB_NAME: database,
  DB_DIALECT: dialect,
  DB_HOST: host = process.env['HOST'],
} = process.env as any

export const sequelize = new Sequelize({
  database,
  dialect,
  host: host || 'db',
  password,
  username,
})

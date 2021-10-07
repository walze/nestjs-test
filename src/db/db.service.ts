import {Car, History, Lot, defineCar, defineHistory, defineLot} from './models'
import {ModelCtor, Sequelize} from 'sequelize'

import {Injectable} from '@nestjs/common'
import {config} from 'dotenv'

config()

const {
  DB_USER: username,
  DB_PW: password,
  DB_NAME: database,
  DB_DIALECT: dialect,
  DB_HOST: host = process.env['HOST'],
} = process.env as any

const defaultOptions = {
  database,
  dialect,
  host: host || 'db',
  password,
  username,
}

@Injectable()
export class DbService extends Sequelize {
  Car: ModelCtor<Car>

  Lot: ModelCtor<Lot>

  History: ModelCtor<History>

  constructor() {
    super(defaultOptions)

    this.Car = defineCar(this)

    this.Lot = defineLot(
        this,
        this.Car
    )

    this.History = defineHistory(
        this,
        this.Car,
        this.Lot
    )
  }
}

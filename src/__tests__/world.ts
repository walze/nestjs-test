import {
  Before,
  IWorldOptions,
  World,
  setWorldConstructor,
} from '@cucumber/cucumber'
import {History, Lot} from 'db/models'
import {IMaybeResponse, INonNullResponse} from 'typings'

import {BlacklistService} from 'blacklist/blacklist.service'
import {Car} from '../db/models/Car'
import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {LotService} from 'lot/lot.service'
import {Sequelize} from 'sequelize-typescript'
import {Transaction} from 'sequelize'
import {config} from 'dotenv'
import {up} from 'db/seeders/20210810171347-lot'

config()

const sequelize = new Sequelize({
  dialect: 'sqlite',
  benchmark: true,
  logging: false,
  transactionType: Transaction.TYPES.IMMEDIATE,
})

sequelize.addModels([Car, Lot, History])

export const resetDB = async () => {
  const s = sequelize

  await s.sync({
    alter: true,
    force: true,
  })

  /*
   * Await down(s.getQueryInterface())
   */

  await up(s.getQueryInterface())
}

Before(resetDB)

export class AWholeNewWorld extends World {
  car: INonNullResponse<Car>

  lot: IMaybeResponse<Lot>

  carService: CarService

  historyService: HistoryService

  blacklistService: BlacklistService

  lotService: LotService

  constructor(args: IWorldOptions) {
    super(args)

    this.carService = new CarService(Car)
    this.historyService = new HistoryService(History)
    this.blacklistService = new BlacklistService(Car)
    this.lotService = new LotService(
        Lot,
        this.carService,
        this.historyService,
    )
  }
}

setWorldConstructor(AWholeNewWorld)

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
import {config} from 'dotenv'
import {up} from 'db/seeders/20210810171347-lot'

config()

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'dist/database.test.sqlite',
  benchmark: true,
  logging: false,
  sync: {alter: true,
    force: true},
})
sequelize.addModels([Car, Lot, History])

Before(async () => {
  await sequelize.
      sync().
      then(s => up(s.getQueryInterface()))
})

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

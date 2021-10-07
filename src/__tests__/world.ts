import {IMaybeResponse, INonNullResponse} from 'typings'
import {IWorldOptions, World, setWorldConstructor} from '@cucumber/cucumber'

import {BlacklistService} from 'blacklist/blacklist.service'
import {Car} from '../db/models/Car'
import {CarService} from 'car/car.service'
import {DbService} from 'db/db.service'
import {HistoryService} from 'history/history.service'
import {Lot} from 'db/models'
import {LotService} from 'lot/lot.service'
import {config} from 'dotenv'

config()

export class AWholeNewWorld extends World {
  car: INonNullResponse<Car>

  lot: IMaybeResponse<Lot>

  db: DbService

  carService: CarService

  historyService: HistoryService

  blacklistService: BlacklistService

  lotService: LotService

  constructor(args: IWorldOptions) {
    super(args)
    const db = new DbService()
    this.db = db

    this.carService = new CarService(db)
    this.historyService = new HistoryService(db)
    this.blacklistService = new BlacklistService(db)
    this.lotService = new LotService(
        db,
        this.carService,
        this.historyService,
    )
  }
}

setWorldConstructor(AWholeNewWorld)

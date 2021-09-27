import {IWorldOptions, World, setWorldConstructor} from '@cucumber/cucumber'

import {Car} from '../db/models/Car'
import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {Lot} from 'db/models'
import {LotService} from 'lot/lot.service'
import {config} from 'dotenv'

config()

export class AWholeNewWorld extends World {
  car: Car

  lot: Lot

  carService = new CarService()

  historyService = new HistoryService()

  lotService: LotService

  constructor(args: IWorldOptions) {
    super(args)

    this.lotService = new LotService(
        this.carService,
        this.historyService
    )
  }
}

setWorldConstructor(AWholeNewWorld)

import {IWorldOptions, World, setWorldConstructor} from '@cucumber/cucumber'

import {Car} from '../db/models/Car'
import {Lot} from 'db/models'

export class AWholeNewWorld extends World {
  car: Car

  lot: Lot

  constructor(args: IWorldOptions) {
    super(args)
  }
}

setWorldConstructor(AWholeNewWorld)

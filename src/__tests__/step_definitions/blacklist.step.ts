/* eslint-disable no-invalid-this */
import {BeforeAll, Given, Then, When} from '@cucumber/cucumber'

import {AWholeNewWorld} from '../world'
import {Car} from 'db/models'
import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {LotService} from 'lot/lot.service'
import {runAPI} from 'config'

BeforeAll(() => {
  runAPI()
})

Given<AWholeNewWorld>(
    'a car plated {word} is banned',
    async function(licensePlate) {
      const [car] = await Car.findOrCreate({where: {
        licensePlate,
        banned: true,
      }})

      this.car = car
    }
)

When<AWholeNewWorld>(
    'that car tries to be assigned to a lot',
    async function() {
      const ls = new LotService(
          new CarService(),
          new HistoryService()
      )

      const [lot] = await ls.assignCar(this.car.licensePlate)
      this.lot = lot
    }
)

Then<AWholeNewWorld>(
    'that car should not be allowed to be assigned',
    function() {
      console.log(
          this.car,
          this.lot
      )
    }
)

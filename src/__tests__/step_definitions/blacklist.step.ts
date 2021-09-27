/* eslint-disable no-invalid-this */
import {Given, Then, When} from '@cucumber/cucumber'

import {AWholeNewWorld} from '__tests__/world'

Given<AWholeNewWorld>(
    'a car plated {word} is banned',
    async function(licensePlate) {
      const [car] = await this.carService.findOrCreate({
        licensePlate,
        banned: true,
      })

      this.car = car
    }
)

When<AWholeNewWorld>(
    'that car tries to be assigned to a lot',
    async function() {
      const [lot] = await this.lotService.assignCar(this.car.licensePlate).
          catch(e => [e])

      this.lot = lot

      console.log(lot)
    }
)

Then<AWholeNewWorld>(
    'that car should not be allowed to be assigned',
    function() {
      // Write code here that turns the phrase above into concrete actions
    }
)

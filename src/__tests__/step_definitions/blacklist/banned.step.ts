/* eslint-disable no-invalid-this */
import {Given, Then, When} from '@cucumber/cucumber'

import {AWholeNewWorld} from '__tests__/world'
import assert from 'assert'
import {pack} from 'package.interceptor'

Given<AWholeNewWorld>(
    'a car plated {word} is banned',
    async function(licensePlate) {
      const car = await this.
          carService.
          findOrCreate({licensePlate}).
          then(([c]) => c).
          then(pack(200))
      if (!car.data) throw car

      await this.blacklistService.ban({licensePlate})

      this.car = car
    }
)

When<AWholeNewWorld>(
    'that car tries to be assigned to a lot',
    async function() {
      const car = this.car.data

      const lotP = this.lotService.
          assignCar(car.licensePlate).
          then(([lot]) => lot).
          then(pack(200)).
          catch(pack(500))

      const lot = await lotP

      this.lot = lot
    }
)

Then<AWholeNewWorld>(
    'we get an error saying "Car {word} is Banned"',
    function(licensePlate) {
      assert.equal(
          this.lot.message,
          `Car ${licensePlate} is Banned`
      )
    }
)

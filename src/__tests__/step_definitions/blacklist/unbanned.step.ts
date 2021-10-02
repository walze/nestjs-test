/* eslint-disable no-invalid-this */
import {Given, Then, When} from '@cucumber/cucumber'
import {pack, packagePromise} from 'package.interceptor'

import {AWholeNewWorld} from '__tests__/world'
import assert from 'assert'

Given<AWholeNewWorld>(
    'a car plated {word}',
    async function(licensePlate) {
      const carP = this.
          carService.
          findOrCreate({licensePlate,
            banned: true}).
          then(([car]) => car)

      const car = await packagePromise(carP)
      if (!car.data) throw car

      this.car = car
    }
)

When<AWholeNewWorld>(
    'it arrives into the parking lot, the car is unbanned',
    async function() {
      const {licensePlate} = this.car.data

      await this.blacklistService.unban({licensePlate})
    }
)

When<AWholeNewWorld>(
    'is assigned to a lot',
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
    'we get an message saying "Successful"',
    function() {
      assert.equal(
          this.lot.message,
          `Successful`
      )
    }
)

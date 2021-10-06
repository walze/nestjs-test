/* eslint-disable no-invalid-this */
import {Given, Then, When} from '@cucumber/cucumber'

import {AWholeNewWorld} from '__tests__/world'
import assert from 'assert'
import {pack} from 'package.interceptor'
import {tap} from 'ramda'

Given<AWholeNewWorld>(
    'a car plated {word}',
    async function(licensePlate) {
      const car = await this.
          carService.
          findOrCreate({licensePlate}).
          then(([c]) => c).
          then(tap(c => {
            c.banned = true
          })).
          then(pack(200))

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

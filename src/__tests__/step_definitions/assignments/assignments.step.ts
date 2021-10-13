/* eslint-disable no-invalid-this */

import {Then, When} from '@cucumber/cucumber'
import {intercept, pack} from 'package.interceptor'

import {AWholeNewWorld} from '__tests__/world'
import assert from 'assert'
import {lastValueFrom} from 'rxjs'

When<AWholeNewWorld>(
    'it is assigned to a lot',
    async function() {
      const car = this.car.data

      const lotP = this.lotService
          .assignCar(car.licensePlate)
          .then(([lot]) => lot)
          .then(pack(200))
          .catch(pack(500))

      const lot = await lotP

      this.lot = lot
    }
)

When<AWholeNewWorld>(
    'it is unassigned to a lot',
    async function() {
      const car = this.car.data

      const lotP = this.lotService
          .unassignCar(car.licensePlate)
          .pipe(intercept(200))

      this.lot = await lastValueFrom(lotP)
    }
)

Then<AWholeNewWorld>(
    'lot\'s assigned car should be {word}',
    async function(licensePlate) {
      const [car] = await this.carService.getAll({licensePlate})
      if (!car) throw new Error(`Could not find car ${licensePlate}`)

      assert.equal(
          this.lot?.data?.carId,
          car.id
      )
    }
)

Then<AWholeNewWorld>(
    'lot should be empty',
    function() {
      assert.equal(
          this.lot.data?.carId,
          null
      )
    }
)

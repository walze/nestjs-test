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

      const lotP = this.lotService.
          assignCar(car.licensePlate).
          then(([lot]) => lot).
          then(pack(200)).
          catch(pack(500))

      const lot = await lotP

      this.lot = lot
    }
)

When<AWholeNewWorld>(
    'it is unassigned to a lot',
    async function() {
      const car = this.car.data

      const lotP = this.lotService.
          unassignCar(car.licensePlate).
          pipe(intercept(200))

      this.lot = await lastValueFrom(lotP)
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

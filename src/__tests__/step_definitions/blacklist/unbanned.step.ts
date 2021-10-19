/* eslint-disable no-invalid-this */

import {AWholeNewWorld} from '__tests__/world'
import {When} from '@cucumber/cucumber'
import {pack} from 'package.interceptor'

When<AWholeNewWorld>(
    'it enters the parking lot, the car is unbanned',
    async function() {
      const {licensePlate} = this.car.data

      await this.blacklistService.unban({licensePlate})
    }
)

When<AWholeNewWorld>(
    'is assigned to a lot',
    async function() {
      const {licensePlate} = this.car.data

      const lotP = this.lotService
          .assignCar(licensePlate)
          .then(({lot}) => lot)
          .then(pack(200))
          .catch(pack(500))

      const lot = await lotP

      this.lot = lot
    }
)

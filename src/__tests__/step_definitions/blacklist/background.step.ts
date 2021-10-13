/* eslint-disable no-invalid-this */

import {AWholeNewWorld} from '__tests__/world'
import {Given} from '@cucumber/cucumber'
import {pack} from 'package.interceptor'
import {tap} from 'ramda'

Given<AWholeNewWorld>(
    'a banned car plated {word}',
    async function(licensePlate) {
      const car = await this
          .carService
          .findOrCreate({licensePlate})
          .then(([c]) => c)
          .then(tap(({licensePlate: lp}) =>
            this.blacklistService.ban({licensePlate: lp})))
          .then(pack(200))

      if (!car.data) throw car

      this.car = car
    }
)

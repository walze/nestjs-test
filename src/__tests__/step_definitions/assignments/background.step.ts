/* eslint-disable no-invalid-this */

import {AWholeNewWorld} from '__tests__/world'
import {Given} from '@cucumber/cucumber'
import {pack} from 'package.interceptor'

Given<AWholeNewWorld>(
    'a car plated {word}',
    async function(licensePlate) {
      const car = await this
          .carService
          .findOrCreate({licensePlate})
          .then(([c]) => c)
          .then(pack(200))

      if (!car.data) throw car

      this.car = car
    }
)

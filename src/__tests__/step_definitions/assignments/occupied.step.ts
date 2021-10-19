/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-invalid-this */

import {AWholeNewWorld, resetDB} from '__tests__/world'

import {Await} from 'typings'
import {LotService} from 'lot/lot.service'
import {When} from '@cucumber/cucumber'

const makeRandomCar = () => ({
  licensePlate: (Math.random() + 1)
      .toString(36)
      .substring(7),
})


type SequencedAssignedCar = Promise<
  Await<ReturnType<LotService['assignCar']>>[]>
export const assignCars = function(
    this: AWholeNewWorld,
    cars: ReturnType<typeof makeRandomCar>[],
): SequencedAssignedCar {
  return cars.reduce(
      (p, {licensePlate}) =>
        p.then(async arr => [
          await this.lotService
              .assignCar(licensePlate),
          ...arr,
        ]),
      Promise.resolve([]) as SequencedAssignedCar
  )
}


When<AWholeNewWorld>(
    'the parking lot is full',
    async function(this: AWholeNewWorld) {
      await resetDB()

      const lots = await this.lotService.getAll()
      const cars: ReturnType<typeof makeRandomCar>[] =
      [...Array(lots.length)].map(makeRandomCar)

      await assignCars.bind(this)(cars)

      return cars
    }
)

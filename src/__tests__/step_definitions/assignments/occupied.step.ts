/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-invalid-this */

import {AWholeNewWorld, resetDB} from '__tests__/world'

import {When} from '@cucumber/cucumber'

const makeRandomCar = () => ({
  licensePlate: (Math.random() + 1)
      .toString(36)
      .substring(7),
})


export const assignCars = async function(
    this: AWholeNewWorld,
    cars: ReturnType<typeof makeRandomCar>[],
) {
  for (let id = 0; id < cars.length; id += 1) {
    const car = cars[id]!

    // eslint-disable-next-line no-await-in-loop
    await this
        .lotService
        .assignCar(
            car.licensePlate,
            id + 1
        )
  }
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

When<AWholeNewWorld>(
    'it is assigned to a occupied lot',
    function() {
      // Write code here that turns the phrase above into concrete actions
      return 'pending'
    }
)

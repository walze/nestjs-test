import {Car, Lot, LotAttr} from 'db/models'
import {RequestError, assertThrowOp, noLotError} from 'helpers'
import {from, map, mergeMap, tap} from 'rxjs'

import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'
import {lt} from 'ramda'

@Injectable()
export class LotService {
  constructor(
    private carService: CarService,
    private historyService: HistoryService,
  ) {}

  getAll(where?: WhereOptions<LotAttr>): Promise<Lot[]> {
    return Lot.findAll({
      include: Car,
      where,
    })
  }

  getById(id: number) {
    return Lot.findOne({
      include: Car,
      where: {
        id,
      },
    })
  }

  updateCarId(id: number, carId: number) {
    return Lot.update(
        {carId},
        {where: {id}},
    )
  }

  // eslint-disable-next-line max-statements
  async assignCar(licensePlate: string) {
    const isAssignedError = {status: 400,
      message: `${licensePlate} is already assigned`}
    const isBannedError = {
      message: `Car ${licensePlate} is Banned`,
      status: 403,
    }

    /*
     * From(this.carService.findOrCreate({licensePlate})).
     *     pipe(
     *         map(([car]) => car),
     *         ifThrowOp((c: Car) => c.banned)(isBannedError),
     *         mergeMap((car) => from(Lot.findOne({where: {carId: car.id}})).
     *             pipe(
     *                 assertThrowOp(isAssignedError),
     *                 map(lot => ({lot,
     *                   car}))
     *             )),
     *         map(lot => lot)
     *     )
     */
    const [car] = await this.carService.findOrCreate({licensePlate})
    if (car.banned) throw RequestError(isBannedError)

    const isAssigned = await Lot.findOne({where: {carId: car.id}})
    if (isAssigned) {
      throw RequestError(isAssignedError)
    }
    const lot = await Lot.findOne({where: {carId: null}})
    if (!lot || lot.carId !== null) throw noLotError(null)

    car.updatedAt = new Date()
    lot.carId = car.id

    this.historyService.create(
        car.id,
        lot.id
    )

    return Promise.all([lot.save(), car.save()])
  }

  unassignCar(licensePlate: string) {
    return from(this.carService.getAll({licensePlate})).
        pipe(
            map(([car]) => car?.id),
            assertThrowOp({
              status: 404,
              message: `No car assigned with plate ${licensePlate}`,
            }),
            mergeMap((carId) => Lot.findOne({where: {carId}})),
            assertThrowOp({
              status: 404,
              message: `No car assigned with plate ${licensePlate}`,
            }),
            tap((lot) => {
              lot.carId = null
            }),
            map((lot) => lot.save()),
        )
  }

  isAvailable() {
    return this.
        amountAvailable().
        then(lt(0))
  }

  amountAvailable = () => Lot.
      findAndCountAll({where: {carId: null}}).
      then(({count}) => count,)
}

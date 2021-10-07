import {Lot, LotAttr} from 'db/models'
import {assertThrowOp, newRequestError, noLotError} from 'helpers'
import {from, map, mergeMap, tap} from 'rxjs'

import {CarService} from 'car/car.service'
import {DbService} from 'db/db.service'
import {HistoryService} from 'history/history.service'
import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'
import {lt} from 'ramda'

@Injectable()
export class LotService {
  constructor(
    private db: DbService,
    private carService: CarService,
    private historyService: HistoryService,
  ) {}

  getAll(where?: WhereOptions<LotAttr>): Promise<Lot[]> {
    return this.db.Lot.findAll({
      include: this.db.Car,
      where,
    })
  }

  getById(id: number) {
    return this.db.Lot.findOne({
      include: this.db.Car,
      where: {
        id,
      },
    })
  }

  updateCarId(id: number, carId: number) {
    return this.db.Lot.update(
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
     *         mergeMap(
     * (car) => from(this.db.Lot.findOne({where: {carId: car.id}})).
     *             pipe(
     *                 assertThrowOp(isAssignedError),
     *                 map(lot => ({lot,
     *                   car}))
     *             )),
     *         map(lot => lot)
     *     )
     */
    const [car] = await this.carService.findOrCreate({licensePlate})
    if (car.banned) throw newRequestError(isBannedError)

    const isAssigned = await this.db.Lot.findOne({where: {carId: car.id}})
    if (isAssigned) {
      throw newRequestError(isAssignedError)
    }
    const lot = await this.db.Lot.findOne({where: {carId: null}})
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
            mergeMap((carId) => this.db.Lot.findOne({where: {carId}})),
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

  amountAvailable() {
    return this.db.Lot.
        findAndCountAll({where: {carId: null}}).
        then(({count}) => count,)
  }
}

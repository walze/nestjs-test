import {Car, Lot} from 'db/models'
import {Op, WhereOptions} from 'sequelize'
import {
  assertThrowFnOp,
  assertTrueOP,
  noLotError,
} from 'helpers'
import {
  forkJoin,
  from,
  lastValueFrom,
  map,
  mergeMap,
  tap,
} from 'rxjs'
import {isAssignedError, isBannedError} from 'errors'

import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {InjectModel} from '@nestjs/sequelize'
import {Injectable} from '@nestjs/common'
import {lt} from 'ramda'

@Injectable()
export class LotService {
  constructor(
    @InjectModel(Lot)
    private lot: typeof Lot,
    private carService: CarService,
    private historyService: HistoryService,
  ) {
  }

  getAll(where?: WhereOptions<Lot['_attributes']>): Promise<Lot[]> {
    return this.lot.findAll({
      include: Car,
      where,
    })
  }

  getById(id: number) {
    return this.lot.findOne({
      include: Car,
      where: {
        id,
      },
    })
  }

  updateCarId(id: number, carId: number) {
    return this.lot.update(
        {carId},
        {where: {id}},
    )
  }

  getVacantLot(car: Car) {
    const query = this.lot.findOne({
      where: {
        carId: {
          [Op.or]: [car.id, null],
        },
      },
    })

    return from(query).pipe(
        assertThrowFnOp(
            lot => typeof lot?.carId !== 'number',
            () => isAssignedError(car.licensePlate)
        ),
        assertTrueOP(noLotError('empty lot')),
        map(lot => ({car, lot}))
    )
  }

  assignCar(licensePlate: string) {
    const result$ = from(this.carService.findOrCreate({licensePlate}))
        .pipe(
            map(([car]) => car),
            assertThrowFnOp(
                c => !c.banned,
                c => isBannedError(c.licensePlate)
            ),
            mergeMap(car => this.getVacantLot(car)),
            tap(({lot, car}) => {
              car.updatedAt = new Date()
              lot.carId = car.id
            }),
            mergeMap(({lot, car}) => forkJoin({
              lot: lot.save(),
              car: car.save(),
              history: this.historyService.create(
                  car.id,
                  lot.id
              ),
            })),
        )

    return lastValueFrom(result$)
  }

  unassignCar(licensePlate: string) {
    return from(this.carService.getAll({licensePlate}))
        .pipe(
            map(([car]) => car?.id),
            assertTrueOP({
              status: 404,
              message: `No car assigned with plate ${licensePlate}`,
            }),
            mergeMap((carId) => this.lot.findOne({where: {carId}})),
            assertTrueOP({
              status: 404,
              message: `No car assigned with plate ${licensePlate}`,
            }),
            tap((lot) => {
              lot.carId = null
            }),
            mergeMap((lot) => lot.save()),
        )
  }

  isAvailable() {
    return this
        .amountAvailable()
        .then(lt(0))
  }

  amountAvailable() {
    return this.lot
        .findAndCountAll({where: {carId: null}})
        .then(({count}) => count,)
  }
}

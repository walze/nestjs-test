import {Car, Lot, LotAttr} from 'db/models'

import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'

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

  get(id: number) {
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
        {where: {id}}
    )
  }

  async assignCar(licensePlate: string) {
    const [car, created] = await this.carService.findOrCreate(licensePlate)
    if (!car) return ['Error during car creation', car, created]

    const isAssigned = await Lot.findOne({where: {carId: car.id}})
    if (isAssigned) return 'assigned'

    const lot = await Lot.findOne({where: {carId: null}})
    if (!lot || lot.carId !== null) return 'not lot'

    car.updatedAt = new Date()
    lot.carId = car.id

    this.historyService.create(
        car.id,
        lot.id
    )

    return Promise.all([lot.save(), car.save()])
  }

  async unassignCar(id: number) {
    const lot = await this.get(id)
    if (!lot) return null

    lot.carId = null

    return lot.save()
  }

  async isAvailable() {
    const n = await this.amountAvailable()

    return n > 0
  }

  amountAvailable() {
    return Lot.findAndCountAll({where: {carId: null}}).then(({count}) => count,)
  }
}

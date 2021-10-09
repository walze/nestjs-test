import {Car} from 'db/models/Car'

import {InjectModel} from '@nestjs/sequelize'
import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'

@Injectable()
export class CarService {
  constructor(@InjectModel(Car)
    private car: typeof Car) {}

  getAll(where?: WhereOptions<Car['_attributes']>): Promise<Car[]> {
    return this.car.findAll({where})
  }

  findOrCreate(where: WhereOptions<Car['_attributes']>) {
    return this.car.findOrCreate({where})
  }

  delete(licensePlate: string) {
    return this.car.destroy({where: {licensePlate}})
  }
}

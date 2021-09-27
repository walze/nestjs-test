import {Car, CarAttr} from 'db/models/Car'

import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'

@Injectable()
export class CarService {
  getAll(where?: WhereOptions<CarAttr>): Promise<Car[]> {
    return Car.findAll({where})
  }

  findOrCreate(where: WhereOptions<CarAttr>) {
    return Car.findOrCreate({where})
  }

  delete(licensePlate: string) {
    return Car.destroy({where: {licensePlate}})
  }
}

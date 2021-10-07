import {Car, CarAttr} from 'db/models/Car'

import {DbService} from 'db/db.service'
import {Injectable} from '@nestjs/common'
import {WhereOptions} from 'sequelize'

@Injectable()
export class CarService {
  constructor(private db: DbService) {}

  getAll(where?: WhereOptions<CarAttr>): Promise<Car[]> {
    return this.db.Car.findAll({where})
  }

  findOrCreate(where: WhereOptions<CarAttr>) {
    return this.db.Car.findOrCreate({where})
  }

  delete(licensePlate: string) {
    return this.db.Car.destroy({where: {licensePlate}})
  }
}

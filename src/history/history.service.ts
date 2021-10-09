import {Op, WhereOptions} from 'sequelize'
import {History} from 'db/models'

import {InjectModel} from '@nestjs/sequelize'
import {Injectable} from '@nestjs/common'

@Injectable()
export class HistoryService {
  constructor(@InjectModel(History)
    private history: typeof History,) {}

  getAll(where?: WhereOptions<History['_attributes']>): Promise<History[]> {
    return this.history.findAll({where})
  }

  create(carId: number, lotId: number) {
    return this.history.create({
      carId,
      date: new Date(),
      lotId,
    })
  }

  delete(carId: number, lotId: number) {
    return this.history.destroy({
      where: {carId,
        lotId},
    })
  }

  getHistory(start: Date | number, end: Date | number) {
    return this.history.findAll({
      where: {
        date: {
          [Op.between]: [Number(start), Number(end)],
        },
      },
    })
  }
}

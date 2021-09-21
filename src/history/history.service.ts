import {History, HistoryAttr} from 'db/models'
import {Op, WhereOptions} from 'sequelize'

import {Injectable} from '@nestjs/common'

@Injectable()
export class HistoryService {
  getAll(where?: WhereOptions<HistoryAttr>): Promise<History[]> {
    return History.findAll({where})
  }

  create(carId: number, lotId: number) {
    return History.create({
      carId,
      date: new Date(),
      lotId,
    })
  }

  delete(carId: number, lotId: number) {
    return History.destroy({
      where: {carId,
        lotId},
    })
  }

  history(start: Date | number, end: Date | number) {
    return History.findAll({
      where: {
        date: {
          [Op.between]: [Number(start), Number(end)],
        },
      },
    })
  }
}

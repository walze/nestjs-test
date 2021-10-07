import {History, HistoryAttr} from 'db/models'
import {Op, WhereOptions} from 'sequelize'

import {DbService} from 'db/db.service'
import {Injectable} from '@nestjs/common'

@Injectable()
export class HistoryService {
  constructor(private db: DbService) {}

  getAll(where?: WhereOptions<HistoryAttr>): Promise<History[]> {
    return this.db.History.findAll({where})
  }

  create(carId: number, lotId: number) {
    return this.db.History.create({
      carId,
      date: new Date(),
      lotId,
    })
  }

  delete(carId: number, lotId: number) {
    return this.db.History.destroy({
      where: {carId,
        lotId},
    })
  }

  history(start: Date | number, end: Date | number) {
    return this.db.History.findAll({
      where: {
        date: {
          [Op.between]: [Number(start), Number(end)],
        },
      },
    })
  }
}

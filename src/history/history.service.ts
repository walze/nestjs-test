import { Injectable } from '@nestjs/common';
import { History } from 'db/models/History';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class HistoryService {
  getAll(where?: WhereOptions<History>): Promise<History[]> {
    return History.findAll({ where });
  }

  create(carId: number, lotId: number) {
    return History.create({
      carId,
      lotId,
      date: new Date(),
    });
  }

  delete(carId: number, lotId: number) {
    return History.destroy({
      where: { carId, lotId },
    });
  }

  history(start: string, end: string) {
    return History.findAll({
      where: {
        updatedAt: {
          [Op.between]: [start, end],
        },
      },
    });
  }
}

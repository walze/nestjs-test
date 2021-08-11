import { Injectable } from '@nestjs/common';
import { History } from 'db/models/History';

@Injectable()
export class HistoryService {
  findOrCreate(carId: number, lotId: number) {
    return History.findOrCreate({
      defaults: { carId, lotId },
      where: { carId, lotId },
    });
  }

  delete(carId: number, lotId: number) {
    return History.destroy({
      where: { carId, lotId },
    });
  }
}

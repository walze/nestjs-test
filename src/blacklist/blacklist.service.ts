import { Injectable } from '@nestjs/common';
import { Car } from 'db/models';
import { Op } from 'sequelize';

@Injectable()
export class BlacklistService {
  isBanned(id: number) {
    return Car.count({
      where: {
        [Op.and]: [id, { banned: true }],
      },
    }).then(Boolean);
  }

  ban(id: number) {
    return Car.findOrCreate({
      where: {
        [Op.and]: [id, { banned: true }],
      },
    });
  }

  unban(id: number) {
    return Car.destroy({
      where: {
        [Op.and]: [id, { banned: false }],
      },
    });
  }
}

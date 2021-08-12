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
    return Car.update(
      {
        banned: true,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  unban(id: number) {
    return Car.destroy({
      where: {
        [Op.and]: [id, { banned: false }],
      },
    });
  }
}

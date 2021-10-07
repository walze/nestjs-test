import {DbService} from 'db/db.service'
import {Injectable} from '@nestjs/common'
import {Op} from 'sequelize'

@Injectable()
export class BlacklistService {
  constructor(private db: DbService) {}

  isBanned(find: { id?: number; licensePlate?: string }) {
    return this.db.Car.count({
      where: {
        [Op.and]: [find, {banned: true}],
      },
    }).then(Boolean)
  }

  ban(where: { id?: number; licensePlate?: string }) {
    return this.db.Car.update(
        {
          banned: true,
        },
        {
          where,
        },
    )
  }

  unban(where: { id?: number; licensePlate?: string }) {
    return this.db.Car.update(
        {
          banned: false,
        },
        {
          where,
        },
    )
  }
}

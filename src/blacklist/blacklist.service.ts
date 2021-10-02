import {Car} from 'db/models'
import {Injectable} from '@nestjs/common'
import {Op} from 'sequelize'

@Injectable()
export class BlacklistService {
  isBanned(find: { id?: number; licensePlate?: string }) {
    return Car.count({
      where: {
        [Op.and]: [find, {banned: true}],
      },
    }).then(Boolean)
  }

  ban(where: { id?: number; licensePlate?: string }) {
    return Car.update(
        {
          banned: true,
        },
        {
          where,
        },
    )
  }

  unban(where: { id?: number; licensePlate?: string }) {
    return Car.update(
        {
          banned: false,
        },
        {
          where,
        },
    )
  }
}

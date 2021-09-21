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

  ban({id, licensePlate}: { id?: number; licensePlate?: string }) {
    return Car.update(
        {
          banned: true,
        },
        {
          where: {
            id,
            licensePlate,
          },
        },
    )
  }

  unban(id: number) {
    return Car.destroy({
      where: {
        [Op.and]: [id, {banned: false}],
      },
    })
  }
}

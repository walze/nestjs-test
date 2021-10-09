import {Car} from 'db/models'
import {InjectModel} from '@nestjs/sequelize'
import {Injectable} from '@nestjs/common'
import {Op} from 'sequelize'

@Injectable()
export class BlacklistService {
  constructor(@InjectModel(Car)
  private car: typeof Car) {}

  isBanned(find: { id?: number; licensePlate?: string }) {
    return this.car.count({
      where: {
        [Op.and]: [find, {banned: true}],
      },
    }).then(Boolean)
  }

  ban(where: { id?: number; licensePlate?: string }) {
    return this.car.update(
        {
          banned: true,
        },
        {
          where,
        },
    )
  }

  unban(where: { id?: number; licensePlate?: string }) {
    return this.car.update(
        {
          banned: false,
        },
        {
          where,
        },
    )
  }
}

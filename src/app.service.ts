import {Injectable} from '@nestjs/common'
import {Sequelize} from 'sequelize-typescript'

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {
    this
        .sequelize
        .authenticate()
  }

  getHello(): string {
    return 'Hello World!'
  }
}

import {Injectable} from '@nestjs/common'
import {Sequelize} from 'sequelize-typescript'

@Injectable()
export class AppService {
  constructor(private sqlz: Sequelize) {
    this.
        sqlz.
        authenticate()
  }

  getHello(): string {
    return 'Hello World!'
  }
}

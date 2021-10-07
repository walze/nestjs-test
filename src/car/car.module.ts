import {CarController} from './car.controller'
import {CarService} from './car.service'
import {DbService} from 'db/db.service'
import {Module} from '@nestjs/common'

@Module({
  controllers: [CarController, DbService],
  providers: [CarService],
})
export class CarModule {}

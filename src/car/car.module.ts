import {Car} from 'db/models'
import {CarController} from './car.controller'
import {CarService} from './car.service'
import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  controllers: [CarController],
  providers: [CarService],
  exports: [SequelizeModule],
})
export class CarModule {}

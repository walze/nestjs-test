import {CarController} from './car.controller'
import {CarService} from './car.service'
import {Module} from '@nestjs/common'

@Module({
  controllers: [CarController],
  providers: [CarService],
})
export class CarModule {}

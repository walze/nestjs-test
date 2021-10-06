import {BlacklistModule} from 'blacklist/blacklist.module'
import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {LotController} from './lot.controller'
import {LotService} from './lot.service'
import {Module} from '@nestjs/common'

@Module({
  controllers: [LotController],
  imports: [BlacklistModule],
  providers: [LotService, CarService, HistoryService],
})
export class LotModule {}

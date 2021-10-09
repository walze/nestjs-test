import {History, Lot} from 'db/models'

import {BlacklistModule} from 'blacklist/blacklist.module'
import {CarService} from 'car/car.service'
import {HistoryService} from 'history/history.service'
import {LotController} from './lot.controller'
import {LotService} from './lot.service'
import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'

@Module({
  imports: [BlacklistModule, SequelizeModule.forFeature([Lot, History])],
  controllers: [LotController],
  providers: [LotService, CarService, HistoryService],
  exports: [SequelizeModule],
})
export class LotModule {}

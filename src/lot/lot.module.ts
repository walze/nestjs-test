import { Module } from '@nestjs/common';
import { BlacklistModule } from 'blacklist/blacklist.module';
import { BlacklistService } from 'blacklist/blacklist.service';
import { CarService } from 'car/car.service';
import { HistoryService } from 'history/history.service';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';

@Module({
  imports: [BlacklistModule],
  controllers: [LotController],
  providers: [LotService, CarService, HistoryService, BlacklistService],
})
export class LotModule {}

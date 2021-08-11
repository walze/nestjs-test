import { Module } from '@nestjs/common';
import { CarService } from 'car/car.service';
import { HistoryService } from 'history/history.service';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';

@Module({
  controllers: [LotController],
  providers: [LotService, CarService, HistoryService],
})
export class LotModule {}

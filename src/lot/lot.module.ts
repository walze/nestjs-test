import { Module } from '@nestjs/common';
import { CarController } from 'car/car.controller';
import { CarService } from 'car/car.service';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';

@Module({
  controllers: [LotController, CarController],
  providers: [LotService, CarService],
})
export class LotModule {}

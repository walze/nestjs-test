import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { BlacklistGuard } from 'blacklist.guard';
import { BlacklistModule } from 'blacklist/blacklist.module';
import { CarService } from 'car/car.service';
import { HistoryService } from 'history/history.service';
import { LotController } from './lot.controller';
import { LotService } from './lot.service';

@Module({
  imports: [BlacklistModule],
  controllers: [LotController],
  providers: [
    LotService,
    CarService,
    HistoryService,
    {
      provide: APP_GUARD,
      useClass: BlacklistGuard,
    },
  ],
})
export class LotModule {}

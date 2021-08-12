import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotModule } from './lot/lot.module';
import { CarModule } from './car/car.module';
import { HistoryService } from './history/history.service';
import { BlacklistGuard } from 'blacklist.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [LotModule, CarModule],
  controllers: [AppController],
  providers: [
    AppService,
    HistoryService,
    {
      provide: APP_GUARD,
      useClass: BlacklistGuard,
    },
  ],
})
export class AppModule {}

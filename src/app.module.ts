import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotModule } from './lot/lot.module';
import { CarModule } from './car/car.module';
import { HistoryService } from './history/history.service';
import { BlacklistService } from './blacklist/blacklist.service';
import { BlacklistController } from './blacklist/blacklist.controller';
import { BlacklistModule } from './blacklist/blacklist.module';

@Module({
  imports: [LotModule, CarModule, BlacklistModule],
  controllers: [AppController, BlacklistController],
  providers: [AppService, HistoryService, BlacklistService],
})
export class AppModule {}

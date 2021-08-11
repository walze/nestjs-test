import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotModule } from './lot/lot.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [LotModule, CarModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotModule } from './lot/lot.module';

@Module({
  imports: [LotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

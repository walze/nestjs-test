import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PackagerInterceptor } from 'packager.interceptor';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LotModule } from './lot/lot.module';

@Module({
  imports: [LotModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PackagerInterceptor,
    },
  ],
})
export class AppModule {}

import {APP_INTERCEPTOR} from '@nestjs/core'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {LotModule} from './lot/lot.module'
import {Module} from '@nestjs/common'
import {PackagerInterceptor} from 'packager.interceptor'

@Module({
  controllers: [AppController],
  imports: [LotModule],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PackagerInterceptor,
    },
  ],
})
export class AppModule {}

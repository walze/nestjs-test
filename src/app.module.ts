import {APP_INTERCEPTOR} from '@nestjs/core'
import {AppController} from './app.controller'
import {AppService} from './app.service'
import {LotModule} from './lot/lot.module'
import {Module} from '@nestjs/common'
import {PackageInterceptor} from 'package.interceptor'
import {SequelizeModule} from '@nestjs/sequelize'
import {config} from 'dotenv'

config()

const {
  DB_USER: username,
  DB_PW: password,
  DB_NAME: database,
  DB_DIALECT: dialect,
  DB_HOST: host = process.env['HOST'],
} = process.env as any

@Module({
  controllers: [AppController],
  imports: [
    SequelizeModule.
        forRoot({
          port: 3306,
          dialect,
          host,
          username,
          password,
          database,
          autoLoadModels: true,
          benchmark: true,
          logging: console.log,
          synchronize: true,
        }),
    LotModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PackageInterceptor,
    },
  ],
  exports: [SequelizeModule],
})
export class AppModule {}

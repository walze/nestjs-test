import {BlacklistController} from './blacklist.controller'
import {BlacklistService} from './blacklist.service'
import {Car} from 'db/models'
import {Module} from '@nestjs/common'
import {SequelizeModule} from '@nestjs/sequelize'

@Module({
  imports: [SequelizeModule.forFeature([Car])],
  providers: [BlacklistService],
  controllers: [BlacklistController],
  exports: [BlacklistService, SequelizeModule],
})
export class BlacklistModule {}

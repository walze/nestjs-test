import {BlacklistController} from './blacklist.controller'
import {BlacklistService} from './blacklist.service'
import {DbService} from 'db/db.service'
import {Module} from '@nestjs/common'

@Module({
  providers: [BlacklistService, DbService],
  controllers: [BlacklistController],
  exports: [BlacklistService],
})
export class BlacklistModule {}

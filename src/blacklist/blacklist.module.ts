import {BlacklistController} from './blacklist.controller'
import {BlacklistService} from './blacklist.service'
import {Module} from '@nestjs/common'

@Module({
  providers: [BlacklistService],
  controllers: [BlacklistController],
  exports: [BlacklistService],
})
export class BlacklistModule {}

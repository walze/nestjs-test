import { Controller, Delete, Param, ParseIntPipe, Post } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
export class BlacklistController {
  constructor(private blacklistService: BlacklistService) {}

  @Post(':id')
  findOrCreate(@Param('id', ParseIntPipe) id: number) {
    return this.blacklistService.ban(id);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.blacklistService.unban(id);
  }
}

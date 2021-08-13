import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'auth.guard';
import { BlacklistService } from 'blacklist/blacklist.service';
import { HistoryService } from 'history/history.service';
import { LotService } from './lot.service';

@Controller('lot')
export class LotController {
  constructor(
    private lotService: LotService,
    private bs: BlacklistService,
    private historyService: HistoryService,
  ) {}

  @Get()
  index() {
    return this.lotService.getAll();
  }

  @Get('c/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.get(id);
  }

  @Post('c')
  assignCar(@Body('licensePlate') licensePlate: string) {
    if (this.bs.isBanned({ licensePlate }))
      throw new ForbiddenException('Car is Banned');

    return this.lotService.assignCar(licensePlate);
  }

  @Delete('c/:id')
  unssignCar(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.unassignCar(id);
  }

  @Get('history')
  @UseGuards(AuthGuard)
  history(@Body('start') start: string, @Body('end') end: string) {
    return this.historyService.history(start, end);
  }

  @Get('available')
  available() {
    return this.lotService.amountAvailable();
  }
}

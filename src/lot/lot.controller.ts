import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'auth.guard';
import { LotService } from './lot.service';

@Controller('lot')
export class LotController {
  constructor(private lotService: LotService) {}

  @Get()
  index() {
    return this.lotService.getAll();
  }

  @Get('c/:id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.get(id);
  }

  @Post('c/')
  assignCar(
    @Body('id', ParseIntPipe) id: number,
    @Body('licensePlate') lp: string,
  ) {
    return this.lotService.assignCar(id, lp);
  }

  @UseGuards(AuthGuard)
  @Delete('c/:id')
  unssignCar(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.unassignCar(id);
  }

  @Get('available')
  available() {
    return this.lotService.amountAvailable();
  }
}

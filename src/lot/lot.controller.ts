import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LotService } from './lot.service';

@Controller('lot')
export class LotController {
  constructor(private lotService: LotService) {}

  @Get()
  index() {
    return this.lotService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.lotService.get(id);
  }
}

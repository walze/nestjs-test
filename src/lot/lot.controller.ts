import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common'
import {AuthGuard} from 'auth.guard'
import {BlacklistService} from 'blacklist/blacklist.service'
import {HistoryService} from 'history/history.service'
import {LotService} from './lot.service'
import {ParseDate} from 'pipes/date.pipe'
import {RequestError} from 'helpers'


@Controller('lot')
export class LotController {
  constructor(
    private lotService: LotService,
    private bs: BlacklistService,
    private historyService: HistoryService,
  ) {}

  @Get()
  index() {
    return this.lotService.getAll()
  }

  @Get('c/:id')
  getOne(@Param(
      'id',
      ParseIntPipe
  ) id: number) {
    return this.lotService.getById(id)
  }

  @Post('c')
  async assignCar(@Body('licensePlate') licensePlate: string) {
    this.bs.isBanned({licensePlate})

    if (await this.bs.isBanned({licensePlate})) {
      throw RequestError({
        message: 'Car is Banned',
        status: 400,
      })
    }

    return this.lotService.assignCar(licensePlate)
  }

  @Delete('c/:licensePlate')
  unssignCar(@Param('licensePlate') licensePlate: string) {
    return this.lotService.unassignCar(licensePlate)
  }

  @Get('history')
  @UseGuards(AuthGuard)
  history(
    @Body(
        'start',
        ParseDate
    )
        start: Date,
    @Body(
        'end',
        ParseDate
    )
        end: Date,
  ) {
    return this.historyService.history(
        start,
        end
    )
  }

  @Get('available')
  available() {
    return this.lotService.amountAvailable()
  }
}

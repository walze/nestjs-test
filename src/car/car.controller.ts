import {Body, Controller, Delete, Get, Post} from '@nestjs/common'
import {CarService} from './car.service'

@Controller('car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  index() {
    return this.carService.getAll()
  }

  @Post()
  findOrCreate(@Body('licensePlate') licensePlate: string) {
    return this.carService.findOrCreate({licensePlate})
  }

  @Delete()
  delete(@Body('licensePlate') licensePlate: string) {
    return this.carService.delete(licensePlate)
  }
}

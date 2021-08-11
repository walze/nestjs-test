import { Injectable } from '@nestjs/common';
import { CarService } from 'car/car.service';
import { Lot } from 'db/models';
import { WhereOptions } from 'sequelize/types';

@Injectable()
export class LotService {
  constructor(private carService: CarService) {}

  getAll(where?: WhereOptions<Lot>): Promise<Lot[]> {
    return Lot.findAll({ where });
  }

  get(id: number): Promise<Lot> {
    return Lot.findOne({
      where: {
        id,
      },
    });
  }

  updateCarId(id: number, carId: number) {
    return Lot.update({ carId }, { where: { id } });
  }

  async assignCar(id: number, licensePlate: string) {
    const lot = await this.get(id);
    const [car] = await this.carService.findOrCreate(licensePlate);
    lot.CarId = car.id;

    return lot.save();
  }

  async unassignCar(id: number) {
    const lot = await this.get(id);
    lot.CarId = null;

    return lot.save();
  }

  amountAvailable() {
    return Lot.findAndCountAll({ where: { carId: null } }).then(
      ({ count }) => count,
    );
  }
}

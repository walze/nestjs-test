import { Injectable } from '@nestjs/common';
import { CarService } from 'car/car.service';
import { Lot } from 'db/models/Lot';
import { sequelize } from 'db/setup';
import { Op, WhereOptions } from 'sequelize';

@Injectable()
export class LotService {
  constructor(private carService: CarService) {}

  getAll(where?: WhereOptions<Lot>): Promise<Lot[]> {
    return Lot.findAll({ where });
  }

  get(id: number) {
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
    if (lot?.CarId !== null) return null;

    const [car] = await this.carService.findOrCreate(licensePlate);
    car.updatedAt = new Date();
    car.save();

    lot.CarId = car.id;

    return sequelize
      .transaction()
      .then((transaction) => {
        car.save({ transaction });
        return lot.save({ transaction });
      })
      .catch((...e) => {
        console.error(...e);
        throw new Error('transaction failed');
      });
  }

  async unassignCar(id: number) {
    const lot = await this.get(id);
    if (!lot) return null;

    lot.CarId = null;

    return lot.save();
  }

  async isAvailable() {
    const n = await this.amountAvailable();

    return n > 0;
  }

  history(start: string, end: string) {
    return this.getAll({
      update: {
        [Op.between]: [start, end],
      },
    });
  }

  amountAvailable() {
    return Lot.findAndCountAll({ where: { carId: null } }).then(
      ({ count }) => count,
    );
  }
}

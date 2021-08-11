import { Injectable } from '@nestjs/common';
import { CarService } from 'car/car.service';
import { Lot } from 'db/models/Lot';
import { sequelize } from 'db/setup';
import { HistoryService } from 'history/history.service';
import { WhereOptions } from 'sequelize';

@Injectable()
export class LotService {
  constructor(
    private carService: CarService,
    private historyService: HistoryService,
  ) {}

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
    const lotData = lot?.get();
    if (!lot || lotData.carId !== null) return null;

    const [car] = await this.carService.findOrCreate(licensePlate);
    if (!car) return null;

    car.setDataValue('updatedAt', new Date());
    lot.setDataValue('carId', car.get('id'));

    return sequelize
      .transaction()
      .then((transaction) => {
        this.historyService.create(car.id, lot.id);

        return Promise.all([
          lot.save({ transaction }),
          car.save({ transaction }),
        ]);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  async unassignCar(id: number) {
    const lot = await this.get(id);
    if (!lot) return null;

    lot.carId = null;

    return lot.save();
  }

  async isAvailable() {
    const n = await this.amountAvailable();

    return n > 0;
  }

  amountAvailable() {
    return Lot.findAndCountAll({ where: { carId: null } }).then(
      ({ count }) => count,
    );
  }
}

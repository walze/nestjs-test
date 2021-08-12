import { Injectable } from '@nestjs/common';
import { CarService } from 'car/car.service';
import { Car } from 'db/models/Car';
import { Lot } from 'db/models/Lot';
import { HistoryService } from 'history/history.service';
import { WhereOptions } from 'sequelize';

@Injectable()
export class LotService {
  constructor(
    private carService: CarService,
    private historyService: HistoryService,
  ) {}

  getAll(where?: WhereOptions<Lot>): Promise<Lot[]> {
    return Lot.findAll({ where, include: Car });
  }

  get(id: number) {
    return Lot.findOne({
      where: {
        id,
      },
      include: Car,
    });
  }

  updateCarId(id: number, carId: number) {
    return Lot.update({ carId }, { where: { id } });
  }

  async assignCar(licensePlate: string) {
    const [car, created] = await this.carService.findOrCreate(licensePlate);
    if (!car) return ['not car', car, created];

    const isAssigned = await Lot.findOne({ where: { carId: car.get('id') } });
    if (isAssigned) return 'assigned';

    const lot = await Lot.findOne({ where: { carId: null } });
    if (!lot || lot.get('carId') !== null) return 'not lot';

    car.setDataValue('updatedAt', new Date());
    lot.setDataValue('carId', car.get('id'));

    this.historyService.create(car.get('id'), lot.get('id'));

    return Promise.all([lot.save(), car.save()]);
  }

  async unassignCar(id: number) {
    const lot = await this.get(id);
    if (!lot) return null;

    lot.setDataValue('carId', null);

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

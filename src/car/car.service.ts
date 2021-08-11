import { Injectable } from '@nestjs/common';
import { Car } from 'db/models/Car';
import { WhereOptions } from 'sequelize/types';

@Injectable()
export class CarService {
  getAll(where?: WhereOptions<Car>): Promise<Car[]> {
    return Car.findAll({ where });
  }

  findOrCreate(licensePlate: string) {
    return Car.findOrCreate({
      where: { licensePlate },
      defaults: { licensePlate },
    });
  }

  delete(licensePlate: string) {
    return Car.destroy({ where: { licensePlate } });
  }
}

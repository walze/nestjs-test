import { defaultTimestamp } from '../../helpers';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../setup';

export class Car extends Model {
  id: number;

  licensePlate: string;

  createdAt: Date;
  updatedAt: Date;
}

Car.init(
  {
    ...defaultTimestamp,
    licensePlate: DataTypes.STRING,
  },
  { sequelize, tableName: 'car' },
);

export class Lot extends Model {
  id: number;

  createdAt: Date;
  updatedAt: Date;

  CarId: number | null;
}
Lot.init({ ...defaultTimestamp }, { sequelize, tableName: 'lot' });

Car.hasOne(Lot);
Lot.belongsTo(Car);

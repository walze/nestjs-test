import { defaultTimestamp } from '../../helpers';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../setup';

export class Car extends Model {
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
  createdAt: Date;
  updatedAt: Date;
}
Lot.init({ ...defaultTimestamp }, { sequelize, tableName: 'lot' });

Car.hasOne(Lot);
Lot.belongsTo(Car);

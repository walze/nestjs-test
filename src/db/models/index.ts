import { defaultTimestamp } from '../../helpers';
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../setup';

export const Car = sequelize.define<Model<Car>>('car', {
  ...defaultTimestamp,
  licensePlate: DataTypes.STRING,
});

export const Lot = sequelize.define<Model<Lot>>('lot', {
  ...defaultTimestamp,
});

Car.hasOne(Lot);
Lot.belongsTo(Car);

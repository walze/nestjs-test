import { DataTypes } from 'sequelize';
import { sequelize } from '../setup';

const defaultTimestamp = {
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};

export const Car = sequelize.define('car', {
  ...defaultTimestamp,
});
export const Lot = sequelize.define('lot', {
  ...defaultTimestamp,
});

Car.hasOne(Lot);
Lot.belongsTo(Car);

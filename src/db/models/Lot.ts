import { sequelize } from 'db/setup';
import { defaultAttributes } from 'helpers';
import { DataTypes, Model, Optional } from 'sequelize';
import { Car } from './Car';

export interface LotAttr {
  id: number;

  carId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export type Lot = Model<LotAttr, Optional<LotAttr, 'id'>>;

export const lotAttr = {
  ...defaultAttributes,
  carId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Car,
    },
  },
};

export const Lot = sequelize.define<Lot>('lot', lotAttr);

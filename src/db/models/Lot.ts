import {DataTypes, Model, Optional} from 'sequelize'

import {Car} from './Car'
import {defaultAttributes} from 'helpers'
import {sequelize} from 'db/setup'

export interface LotAttr {
  id: number;

  carId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export type Lot = LotAttr & Model<LotAttr, Optional<LotAttr, 'id'>>;

export const lotAttr = {
  ...defaultAttributes,
  carId: {
    references: {
      model: Car,
    },
    type: DataTypes.INTEGER.UNSIGNED,
  },
}

export const Lot = sequelize.define<Lot>(
    'lot',
    lotAttr
)

import {DataTypes, Model, ModelCtor, Optional, Sequelize} from 'sequelize'

import type {Car} from './Car'
import {defaultAttributes} from 'helpers'

export interface LotAttr {
  id: number;

  carId: number | null;

  createdAt: Date;
  updatedAt: Date;
}

export type Lot = LotAttr & Model<LotAttr, Optional<LotAttr, 'id'>>;

export const defineLot = (sql: Sequelize, car: ModelCtor<Car>) => {
  const lot = sql.define<Lot>(
      'lot',
      {
        ...defaultAttributes,
        carId: {
          references: {
            model: car,
          },
          type: DataTypes.INTEGER.UNSIGNED,
        },
      }
  )

  lot.belongsTo(
      car,
      {foreignKey: 'carId',
        constraints: false}
  )

  return lot
}

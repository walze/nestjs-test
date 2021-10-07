import {DataTypes, Model, ModelCtor, Optional, Sequelize} from 'sequelize'

import type {Car} from './Car'
import type {Lot} from './Lot'
import {defaultAttributes} from 'helpers'

export interface HistoryAttr {
  id: number;

  lotId: number;
  carId: number;
  date: Date;
}

export type History = HistoryAttr &
  Model<HistoryAttr, Optional<HistoryAttr, 'id'>>;

export const defineHistory =
(
    s: Sequelize,
    c: ModelCtor<Car>,
    l: ModelCtor<Lot>
) => {
  const h = s.define<History>(
      'history',
      {
        ...defaultAttributes,
        date: DataTypes.DATE,
        carId: {
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
            model: c,
          },
        },
        lotId: {
          type: DataTypes.INTEGER.UNSIGNED,
          references: {
            model: l,
          },
        },
      }
  )


  c.hasMany(
      h,
      {foreignKey: 'carId',
        constraints: false}
  )
  l.hasMany(
      h,
      {foreignKey: 'lotId',
        constraints: false}
  )

  return h
}

import {DataTypes, Model, Optional} from 'sequelize'

import {Car} from './Car'
import {Lot} from './Lot'
import {defaultAttributes} from 'helpers'
import {sequelize} from 'db/setup'

export interface HistoryAttr {
  id: number;

  lotId: number;
  carId: number;
  date: Date;
}

export type History = HistoryAttr &
  Model<HistoryAttr, Optional<HistoryAttr, 'id'>>;

export const historyAttr = {
  ...defaultAttributes,
  date: DataTypes.DATE,
  carId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Car,
    },
  },
  lotId: {
    type: DataTypes.INTEGER.UNSIGNED,
    references: {
      model: Lot,
    },
  },
}

export const History = sequelize.define<History>(
    'history',
    historyAttr
)

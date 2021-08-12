import { sequelize } from 'db/setup';
import { defaultAttributes } from 'helpers';
import { DataTypes, Model, Optional } from 'sequelize';
import { Car } from './Car';

export interface HistoryAttr {
  id: number;

  lotId: number;
  carId: number;
  date: Date;
}

export type History = Model<HistoryAttr, Optional<HistoryAttr, 'id'>>;

export const historyAttr = {
  ...defaultAttributes,
  date: DataTypes.DATE,
  carId: {
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
  },
  lotId: {
    type: DataTypes.INTEGER,
    references: {
      model: Car,
      key: 'id',
    },
  },
};

export const History = sequelize.define<History>('history', historyAttr);

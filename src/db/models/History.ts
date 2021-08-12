import { DataTypes, Model } from 'sequelize';

export class History extends Model {
  id: number;

  lotId: number;
  carId: number;
  date: Date;
}

export const historyAttr = {
  date: DataTypes.DATE,
};

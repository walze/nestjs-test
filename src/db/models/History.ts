import { defaultTimestamp } from 'helpers';
import { Model } from 'sequelize';

export class History extends Model {
  id: number;

  lotId: number;
  carId: number;
}

export const historyAttr = {
  ...defaultTimestamp,
};

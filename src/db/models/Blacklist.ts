import { defaultTimestamp } from 'helpers';
import { Model } from 'sequelize';

export class Blacklist extends Model {
  id: number;

  carId: number;
}

export const blacklistAttr = {
  ...defaultTimestamp,
};

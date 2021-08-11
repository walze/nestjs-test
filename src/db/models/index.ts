import { sequelize } from '../setup';
import { Car, carAttr } from './Car';
import { History, historyAttr } from './History';
import { Lot, lotAttr } from './Lot';

Car.init(carAttr, { sequelize, tableName: 'car' });
Lot.init(lotAttr, { sequelize, tableName: 'lot' });
History.init(historyAttr, {
  sequelize,
  tableName: 'history',
  timestamps: false,
});

Car.hasOne(Lot);
Lot.belongsTo(Car);

Car.hasMany(History);
Lot.hasMany(History);

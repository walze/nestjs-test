import { sequelize } from '../setup';
import { Car, carAttr } from './Car';
import { History, historyAttr } from './History';
import { Lot, lotAttr } from './Lot';

Car.init(carAttr, { sequelize, tableName: 'car' });
Lot.init(lotAttr, { sequelize, tableName: 'lot' });
History.init(historyAttr, {
  sequelize,
  tableName: 'history',
  timestamps: true,
});

Car.hasOne(Lot, { foreignKey: 'carId' });
Lot.belongsTo(Car, { foreignKey: 'carId' });

Car.hasMany(History, { foreignKey: 'carId' });
Lot.hasMany(History, { foreignKey: 'lotId' });

import { sequelize } from '../setup';
import { Blacklist, blacklistAttr } from './Blacklist';
import { Car, carAttr } from './Car';
import { History, historyAttr } from './History';
import { Lot, lotAttr } from './Lot';

Blacklist.init(blacklistAttr, { sequelize, tableName: 'blacklist' });
Car.init(carAttr, { sequelize, tableName: 'car' });
Lot.init(lotAttr, { sequelize, tableName: 'lot' });
History.init(historyAttr, {
  sequelize,
  tableName: 'history',
  timestamps: true,
});

Blacklist.hasOne(Car, { foreignKey: 'carId' });

Car.hasOne(Lot, { foreignKey: 'carId' });
Lot.belongsTo(Car, { foreignKey: 'carId' });

Car.hasMany(History, { foreignKey: 'carId' });
Lot.hasMany(History, { foreignKey: 'lotId' });

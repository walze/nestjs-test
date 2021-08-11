import { sequelize } from '../setup';
import { Car, carAttr } from './Car';
import { Lot, lotAttr } from './Lot';

Car.init(carAttr, { sequelize, tableName: 'car' });
Lot.init(lotAttr, { sequelize, tableName: 'lot' });

Car.hasOne(Lot);
Lot.belongsTo(Car);

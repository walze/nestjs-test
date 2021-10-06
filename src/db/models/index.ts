import {Car} from './Car'
import {History} from './History'
import {Lot} from './Lot'

Car.hasOne(
    Lot,
    {foreignKey: 'carId',
      constraints: false}
)
Lot.belongsTo(
    Car,
    {foreignKey: 'carId',
      constraints: false}
)

Car.hasMany(
    History,
    {foreignKey: 'carId',
      constraints: false}
)
Lot.hasMany(
    History,
    {foreignKey: 'lotId',
      constraints: false}
)

export * from './Car'
export * from './Lot'
export * from './History'

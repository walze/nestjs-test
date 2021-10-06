import {QueryInterface} from 'sequelize/types'

const numberOfLots = 10
const lots = [
  ...Array(numberOfLots).map(() => ({})),
]

export const up = (qi: QueryInterface) => qi.
    bulkInsert(
        'lots',
        lots
    )

export const down = (qi: QueryInterface) => qi.
    bulkDelete(
        'lots',
        {}
    )

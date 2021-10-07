import {Sequelize} from 'sequelize/types'

export const initialiseSql = (s: Sequelize) => s.
    authenticate().
    then(() => s.sync({
      alter: false,
      force: false,
      logging: console.log,
    }),).
    catch((e) => {
      console.error(
          'Unable to connect to the database:',
          e
      )
      throw e
    })

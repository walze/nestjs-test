import {sequelize} from './setup'

export const initialiseSql = () => sequelize.
    authenticate().
    then(() => sequelize.sync({
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

import {bootstrap, setupSwagger} from 'config'

import {initialiseSql} from './db'
import {install} from 'source-map-support'
import {tap} from 'ramda'

install()

initialiseSql().
    then(bootstrap).
    then(tap(setupSwagger)).
    then(tap((app) => {
      app.listen(3000)
    }),)

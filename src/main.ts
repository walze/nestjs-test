import { install } from 'source-map-support';
import { bootstrap, setupSwagger } from 'config';
import { tap } from 'ramda';
import { initialiseSql } from './db';

install();

initialiseSql()
  .then(bootstrap)
  .then(tap(setupSwagger))
  .then(
    tap((app) => {
      app.listen(3000);
    }),
  );

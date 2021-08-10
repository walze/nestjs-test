import { Sequelize } from 'sequelize';

// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as config from '../../sql.config.js';

// Option 2: Passing parameters separately (other dialects)
export const sequelize = new Sequelize({
  ...config[process.env.NODE_ENV],
  host: 'db',
});

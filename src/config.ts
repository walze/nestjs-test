import { Config, environments } from 'typings';

// eslint-disable-next-line @typescript-eslint/no-var-requires
export const config = require('../sql.config.js') as Config;
export const ENV = process.env['NODE_ENV'] as environments;
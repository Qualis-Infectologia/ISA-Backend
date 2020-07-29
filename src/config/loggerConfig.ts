import { Configuration } from 'log4js';

export default {
  appenders: {
    mongo: {
      type: 'log4js-node-mongodb',
      connectionString: process.env.LOG_HOST,
      category: 'cheese',
    },
  },
  categories: { default: { appenders: ['mongo'], level: 'error' } },
} as Configuration;

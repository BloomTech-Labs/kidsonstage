// Update with config settings.

const keys = require('./config/keys');

module.exports = {
  client: 'pg',
  connection: {
    host: keys.PGSQL_HOST,
    user: keys.PGSQL_USER,
    password: keys.PGSQL_PASSWORD,
    database: keys.PGSQL_DATABASE,
    port: keys.PGSQL_PORT
  },
  searchPath: ['knex', 'public'],
  useNullAsDefault: true,
  migrations: {
    tableName: 'dbmigrations'
  },
  seeds: {
    directory: './database/seeds'
  }
};

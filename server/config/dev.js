/* FILENAME: dev.js
 * ABOUT:    This file is read by 'keys.js' upon initialization;
 *           The keys are equivalent to those found in 'prod.js';
 *           the values are provided by the local user's '.env' file
 *           which is not to be saved in a Git repository.
 */

module.exports = {
  PGSQL_HOST: process.env.LOCAL_PGSQL_HOST,
  PGSQL_USER: process.env.LOCAL_PGSQL_USER,
  PGSQL_PASSWORD: process.env.LOCAL_PGSQL_PASSWORD,
  PGSQL_DATABASE: process.env.LOCAL_PGSQL_DATABASE,
  PGSQL_PORT: process.env.LOCAL_PGSQL_PORT
};

/* FILENAME: prod.js
 * ABOUT:    This file is read by 'keys.js' upon initialization;
 *           The keys are equivalent to those found in 'dev.js';
 *           the values are provided by HEROKU during a deployment.
 */

module.exports = {
    PGSQL_HOST: process.env.PROD_PGSQL_HOST,
    PGSQL_USER: process.env.PROD_PGSQL_USER,
    PGSQL_PASSWORD: process.env.PROD_PGSQL_PASSWORD,
    PGSQL_DATABASE: process.env.PROD_PGSQL_DATABASE,
    PGSQL_PORT: process.env.PROD_PGSQL_PORT
  };
  
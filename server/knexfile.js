// Update with config settings.

// const keys = require('./config/keys');

// module.exports = {
// 	client: 'pg',
// 	connection: {
// 		host: keys.PGSQL_HOST,
// 		user: keys.PGSQL_USER,
// 		password: keys.PGSQL_PASSWORD,
// 		port: keys.PGSQL_PORT,
// 		database: keys.PGSQL_DATABASE
// 	},
// 	searchPath: ['knex'],
// 	//searchPath: ['knex', 'public'],
// 	//useNullAsDefault: true,
// 	migrations: {
// 		tableName: 'dbmigrations'
// 	},
// 	seeds: {
// 		directory: './database/seeds'
// 	}
// };

// Update with config settings.

const keys = require('./config/keys');

module.exports = {
	client: 'pg',
	connection: 'postgres://postgres:0000@127.0.0.1:5432/kidsonstage',
	searchPath: ['knex', 'public'],
	useNullAsDefault: true,
	migrations: {
		tableName: 'dbmigrations'
	},
	seeds: {
		directory: './database/seeds'
	}
};

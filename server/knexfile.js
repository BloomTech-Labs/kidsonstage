//I used this to test my code.  if we don't need, then remove.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: { filename: './database/blogdb.sqlite3' }, // change this if you want a different name for the database
		useNullAsDefault: true, // used to avoid warning on console
		migrations: {
			directory: './database/migrations',
			tableName: 'dbmigrations' //change this for the table
		},
		seeds: { directory: './database/seeds' }
		// debug: true,
	},
	production: {
		client: 'mysql',
		connection: {
			host: 'localhost', // update this
			user: 'user', // update this with the user you use to connect
			password: 'pass', // update this with the password of the user you use to connect
			database: 'kidsonstage' // if different database change this name
		},
		pool: {
			min: 1,
			max: 10
		},
		migrations: {
			directory: './database/migrations',
			tableName: 'dbmigrations'
		},
		seeds: { directory: './database/seeds' }
	}
};

// tbl.increments('id').primary(); // primary key
// tbl.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
// tbl.integer('userClass').references('id').inTable('userClass').defaultTo('1');    
// tbl.string('username', 32).notNullable().unique('username');
// tbl.string('password', 32).notNullable();
// tbl.string('email', 70).notNullable();
// tbl.string('phoneNumber',12)
// tbl.string('vcode', 8).notNullable();
// tbl.boolean('validated').defaultTo(false);
// tbl.boolean('byEmail').defaultTo(false);
// tbl.boolean('byPhone').defaultTo(false);

exports.seed = function(knex, Promise) {
	return knex('users')
		.del() // delete all user's
		.then(function() {
			return knex('users').insert([
				{
					id: 1,
					userClass: 3,
					username: "admin",
					password: "password123",
					email: "email@email.com",
					phoneNumber: "000-000-0000",
					vcode: 12345678,
					validated: true
				},
				{
					id: 2,
					userClass: 1,
					username: "user1",
					password: "password123",
					email: "email@email.com",
					phoneNumber: "000-000-0000",
					vcode: 12345678,
					validated: true
				}
			]);
		});
	
};

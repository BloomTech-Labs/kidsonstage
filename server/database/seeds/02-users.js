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
					username: "super1",
					password: "password",
					email: "email@email.com",
					phoneNumber: "210-992-0203",
					vcode: 12345678,
					validated: true
				},
				{
					id: 2,
					userClass: 2,
					username: "admin1",
					password: "password",
					email: "email@email.com",
					phoneNumber: "860-555-5535",
					vcode: 12345678,
					validated: true
				},
				{
					id: 3,
					userClass: 2,
					username: "admin2",
					password: "password",
					email: "email@email.com",
					phoneNumber: "401-965-4454",
					vcode: 12345678,
					validated: true
				},
				{
					id: 4,
					userClass: 2,
					username: "admin3",
					password: "password",
					email: "email@email.com",
					phoneNumber: "403-303-1323",
					vcode: 12345678,
					validated: true
				},
				{
					id: 5,
					userClass: 1,
					username: "user1",
					password: "password",
					email: "email@email.com",
					phoneNumber: "525-555-5343",
					vcode: 12345678,
					validated: true
				},
				{
					id: 6,
					userClass: 1,
					username: "user2",
					password: "password",
					email: "email@email.com",
					phoneNumber: "223-496-7696",
					vcode: 12345678,
					validated: true
				},
				{
					id: 7,
					userClass: 1,
					username: "user3",
					password: "password",
					email: "email@email.com",
					phoneNumber: "619-843-6642",
					vcode: 12345678,
					validated: false
				}
				,
				{
					id: 8,
					userClass: 1,
					username: "user4",
					password: "password",
					email: "email@email.com",
					phoneNumber: "444-426-2342",
					vcode: 12345678,
					validated: true
				},
				{
					id: 9,
					userClass: 1,
					username: "user5",
					password: "password",
					email: "email@email.com",
					phoneNumber: "353-652-4562",
					vcode: 12345678,
					validated: false
				}
			]);
		});
	
};

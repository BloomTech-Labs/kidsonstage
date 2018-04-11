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
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "210-992-0203",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: true
				},
				{
					id: 2,
					userClass: 2,
					username: "admin1",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "860-555-5535",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: true
				},
				{
					id: 3,
					userClass: 2,
					username: "admin2",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "401-965-4454",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: false
				},
				{
					id: 4,
					userClass: 2,
					username: "admin3",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "403-303-1323",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: true
				},
				{
					id: 5,
					userClass: 1,
					username: "user1",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "boomer1204@gmail.com",
					phoneNumber: "210-992-0265",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: true
				},
				{
					id: 6,
					userClass: 1,
					username: "user2",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "boomer1204@gmail.com",
					phoneNumber: "210-992-0265",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: false
				},
				{
					id: 7,
					userClass: 1,
					username: "user3",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "boomer1204@gmail.com",
					phoneNumber: "608-695-4106",
					vcode: 12345678,
					validated: false,
					byEmail: false,
					byPhone: true
				}
				,
				{
					id: 8,
					userClass: 1,
					username: "user4",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "608-695-4106",
					vcode: 12345678,
					validated: true,
					byEmail: false,
					byPhone: true
				},
				{
					id: 9,
					userClass: 1,
					username: "user5",
					password: "$2a$10$vjJXVaubFksjjx5O4Ekn8.2aDG//wHQYC1vbDTlBtm63b1VH03zKy",
					email: "tylersanford0311@gmail.com",
					phoneNumber: "608-695-4106",
					vcode: 12345678,
					validated: true,
					byEmail: true,
					byPhone: true
				}
			]);
		});
	
};

// tbl.increments('id').primary(); // primary key
// tbl.integer('owner').references('id').inTable('users');
// tbl.string('title', 100).notNullable();
// tbl.dateTime('eventDate').notNullable();
// tbl.boolean('activated').notNullable().defaultTo(false);
// tbl.boolean('completed').notNullable().defaultTo(false);

exports.seed = function(knex, Promise) {
	return knex('events')
		.del() // delete all user's
		.then(function() {
			return knex('events').insert([
				{
					id: 1,
					owner: 1,
					title: "School Swim Tournament",
					eventDate: "2018-04-01 12:30:00",
				}
			]);
		});
	
};
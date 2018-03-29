// tbl.increments('id').primary(); // primary key
// tbl.integer('eventId').references('id').inTable('events');
// tbl.string('name',100).notNullable();
// tbl.dateTime('time').notNullable();
// tbl.boolean('completed').notNullable().defaultTo(false);

exports.seed = function(knex, Promise) {
	return knex('groups')
		.del() // delete all user's
		.then(function() {
			return knex('groups').insert([
				{
					id: 1,
					eventId: 1,
					name: "Michael Phelps",
					time: "2018-04-01 12:55:00",
				}
			]);
		});
};
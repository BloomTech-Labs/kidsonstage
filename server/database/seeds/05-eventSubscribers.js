// tbl.increments('id').primary(); // primary key
// tbl.integer('eventId').references('id').inTable('events');
// tbl.integer('userId').references('id').inTable('users');
// tbl.integer('groupId').references('id').inTable('groups');

exports.seed = function(knex, Promise) {
	return knex('eventSubscribers')
		.del() // delete all user's
		.then(function() {
			return knex('eventSubscribers').insert([
				{
					id: 1,
					eventId: 1,
					userId: 2,
					groupId: 1
				}
			]);
		});
};
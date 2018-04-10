// tbl.increments('id').primary(); // primary key
// tbl.integer('eventId').references('id').inTable('events');
// tbl.integer('userId').references('id').inTable('users');
// tbl.integer('groupId').references('id').inTable('groups');

exports.seed = function(knex, Promise) {
	return knex('eventSubscribers')
		.del() // delete all user's
		.then(function() {
			return knex('eventSubscribers').insert([
				// Event 1
				{
					id: 1,
					eventId: 1,
					userId: 5,
					groupId: 1
				},
				{
					id: 2,
					eventId: 1,
					userId: 6,
					groupId: 1
				},
				{
					id: 3,
					eventId: 1,
					userId: 7,
					groupId: 2
				},
				{
					id: 4,
					eventId: 1,
					userId: 5,
					groupId: 3
				},
				{
					id: 5,
					eventId: 1,
					userId: 8,
					groupId: 4
				},
				{
					id: 6,
					eventId: 1,
					userId: 9,
					groupId: 4
				},
				{
					id: 7,
					eventId: 1,
					userId: 7,
					groupId: 5
				},
				{
					id: 8,
					eventId: 1,
					userId: 8,
					groupId: 5
				},

				// Event 2
				{
					id: 9,
					eventId: 2,
					userId: 5,
					groupId: 6
				},
				{
					id: 10,
					eventId: 2,
					userId: 7,
					groupId: 7
				},
				{
					id: 11,
					eventId: 2,
					userId: 9,
					groupId: 7
				},
				{
					id: 12,
					eventId: 2,
					userId: 6,
					groupId: 8
				},
				{
					id: 13,
					eventId: 2,
					userId: 8,
					groupId: 8
				},
				{
					id: 14,
					eventId: 2,
					userId: 9,
					groupId: 8
				},
				{
					id: 15,
					eventId: 2,
					userId: 5,
					groupId: 9
				},
				{
					id: 16,
					eventId: 2,
					userId: 8,
					groupId: 9
				},

				// Event 3
				{
					id: 17,
					eventId: 3,
					userId: 5,
					groupId: 10
				},
				{
					id: 18,
					eventId: 3,
					userId: 6,
					groupId: 10
				},
				{
					id: 19,
					eventId: 3,
					userId: 7,
					groupId: 11
				},
				{
					id: 20,
					eventId: 3,
					userId: 8,
					groupId: 12
				},
				{
					id: 21,
					eventId: 3,
					userId: 9,
					groupId: 13
				},
				{
					id: 22,
					eventId: 3,
					userId: 6,
					groupId: 13
				},

				// Event 4
				{
					id: 23,
					eventId: 4,
					userId: 5,
					groupId: 14
				},
				{
					id: 24,
					eventId: 4,
					userId: 6,
					groupId: 14
				},
				{
					id: 25,
					eventId: 4,
					userId: 7,
					groupId: 15
				},
				{
					id: 26,
					eventId: 4,
					userId: 8,
					groupId: 15
				},
				{
					id: 27,
					eventId: 4,
					userId: 9,
					groupId: 15
				},
				{
					id: 28,
					eventId: 4,
					userId: 5,
					groupId: 16
				},
				{
					id: 29,
					eventId: 4,
					userId: 7,
					groupId: 16
				},
				{
					id: 30,
					eventId: 4,
					userId: 8,
					groupId: 17
				},

				// Event 5
				{
					id: 31,
					eventId: 5,
					userId: 5,
					groupId: 18
				},
				{
					id: 32,
					eventId: 5,
					userId: 6,
					groupId: 18
				},
				{
					id: 33,
					eventId: 5,
					userId: 7,
					groupId: 19
				},
				{
					id: 34,
					eventId: 5,
					userId: 8,
					groupId: 19
				},
				{
					id: 35,
					eventId: 5,
					userId: 9,
					groupId: 19
				},
				{
					id: 36,
					eventId: 5,
					userId: 5,
					groupId: 19
				},
				{
					id: 37,
					eventId: 5,
					userId: 7,
					groupId: 20
				},
				{
					id: 38,
					eventId: 5,
					userId: 8,
					groupId: 20
				},
				{
					id: 39,
					eventId: 5,
					userId: 9,
					groupId: 21
				},
				{
					id: 40,
					eventId: 5,
					userId: 8,
					groupId: 21
				},
			]);
		});
};
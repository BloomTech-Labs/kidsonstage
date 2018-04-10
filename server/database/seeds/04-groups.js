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
				// Swim Tournament - EVENT 1
				{
					id: 1,
					eventId: 1,
					name: "Southside Dolphins",
					time: "12:00:00",
				},
				{
					id: 2,
					eventId: 1,
					name: "Eastern Great White Sharks",
					time: "12:15:00",
				},
				{
					id: 3,
					eventId: 1,
					name: "Northern Private Barracuda",
					time: "12:30:00",
				},
				{
					id: 4,
					eventId: 1,
					name: "Minnows",
					time: "12:45:00",
				},
				{
					id: 5,
					eventId: 1,
					name: "Blue Whales",
					time: "1:00:00",
				},

				// Chess tournament - EVENT 2
				{
					id: 6,
					eventId: 2,
					name: "Kings Group",
					time: "12:00:00",
				},
				{
					id: 7,
					eventId: 2,
					name: "Not another Pawn",
					time: "12:15:00",
				},
				{
					id: 8,
					eventId: 2,
					name: "Elderly Queens",
					time: "12:30:00",
				},
				{
					id: 9,
					eventId: 2,
					name: "The Chess Sharks",
					time: "12:45:00",
				},
				
				// Choir Performance - EVENT 3
				{
					id: 10,
					eventId: 3,
					name: "Alto",
					time: "12:00:00",
				},
				{
					id: 11,
					eventId: 3,
					name: "Supranos",
					time: "12:15:00",
				},
				{
					id: 12,
					eventId: 3,
					name: "Barritone",
					time: "12:30:00",
				},
				{
					id: 13,
					eventId: 3,
					name: "Tennors",
					time: "12:45:00",
				},

				// Track and Field - Event 4
				{
					id: 14,
					eventId: 4,
					name: "50 Meter",
					time: "12:00:00",
				},
				{
					id: 15,
					eventId: 4,
					name: "Pole Vault",
					time: "12:15:00",
				},
				{
					id: 16,
					eventId: 4,
					name: "Shotput",
					time: "12:30:00",
				},
				{
					id: 17,
					eventId: 4,
					name: "discuss",
					time: "12:45:00",
				},

				// Basketball Tournament - Event 5
				{
					id: 18,
					eventId: 5,
					name: "Warriors",
					time: "12:00:00",
				},
				{
					id: 19,
					eventId: 5,
					name: "Suns",
					time: "12:15:00",
				},
				{
					id: 20,
					eventId: 5,
					name: "Spurs",
					time: "12:30:00",
				},
				{
					id: 21,
					eventId: 5,
					name: "Celtics",
					time: "12:45:00",
				},
			]);
		});
};
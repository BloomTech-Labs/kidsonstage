exports.up = function(knex, Promise) {
	return knex.schema.createTable('eventSubscribers', function(tbl) {
		tbl.increments('id').primary(); // primary key
        tbl.integer('eventId').references('id').inTable('events');
        tbl.integer('userId').references('id').inTable('users');
        tbl.integer('groupId').references('id').inTable('groups');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('eventSubscribers');
};

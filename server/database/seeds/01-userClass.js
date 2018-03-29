// tbl.increments('id').primary(); // primary key	
// tbl.string('className', 32).notNullable().unique('className');

exports.seed = function(knex, Promise) {
	return knex('userClass')
		.del() // delete all user's
		.then(function() {
			return knex('userClass').insert([
				{
					id: 1,
					className: 'user'
				},
				{
					id: 2,
					className: "admin"
				},
				{
					id: 3,
					className: "Super Admin"
				}
			]);
		});
};
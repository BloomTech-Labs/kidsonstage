const db = require('../config/dbConfiguration.js');

module.exports = {
	get: function(id) {
		let query = db('admins');
		if (id) {
			query.where('id', id).first();
		}

		return query;
	},
	getAdminEvents: function(adminId) {
		// return admin event listings, etc etc for that page
	},
	insert: function(admin) {
		return db('admins')
			.insert(admin)
			.then(ids => ({ id: ids[0] }));
	},
	update: function(id, admin) {
		return db('admins')
			.where('id', id)
			.update(admin);
	},
	remove: function(id) {
		return db('admins')
			.where('id', id)
			.del();
	}
};

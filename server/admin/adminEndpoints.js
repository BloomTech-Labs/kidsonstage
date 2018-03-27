const express = require('express');

const admins = require('./adminController');

const adminRouter = express.Router();

adminRouter.post('/', function(req, res) {
	const admin = req.body;

	admins
		.insert(admin)
		.then(function(id) {
			res.status(201).json(id);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

adminRouter.get('/', function(req, res) {
	admins
		.get()
		.then(function(admins) {
			res.status(200).json(admins);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

adminRouter.get('/:id', function(req, res) {
	const { id } = req.params;

	admins
		.get(id)
		.then(function(admin) {
			if (admin) {
				res.status(200).json(admin);
			} else {
				res.status(404).json(null);
			}
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

adminRouter.get('/:id/events', function(req, res) {
	const { id } = req.params;

	admins
		.getAdminEvents(id)
		.then(function(events) {
			res.status(200).json(events);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

adminRouter.put('/:id', function(req, res) {
	//change this to whatever we need.  Atm its basic with an event counter.
	const { id } = req.params;

	admins
		.update(id, req.body)
		.then(function(eventCount) {
			if (eventCount > 0) {
				res.status(200).json({ updated: eventCount });
			} else {
				res.status(404).json(null);
			}
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

adminRouter.delete('/:id', function(req, res) {
	const { id } = req.params;

	admins
		.remove(id)
		.then(function(eventCount) {
			res.status(200).json({ eventCount });
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

module.exports = adminRouter;

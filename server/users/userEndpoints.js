const express = require('express');

const users = require('./userControllers');

const userRouter = express.Router();

userRouter.post('/', function(req, res) {
	const user = req.body;

	users
		.insert(user)
		.then(function(id) {
			res.status(201).json(id);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

userRouter.get('/', function(req, res) {
	users
		.get()
		.then(function(users) {
			res.status(200).json(users);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

userRouter.get('/:id', function(req, res) {
	const { id } = req.params;

	users
		.get(id)
		.then(function(user) {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json(null);
			}
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

userRouter.get('/:id/subscriptions', function(req, res) {
	//change this to whatever we need
	const { id } = req.params;

	users
		.getUserSubs(id)
		.then(function(posts) {
			res.status(200).json(posts);
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

userRouter.put('/:id', function(req, res) {
	// change this to whatever we need.  Atm its basic .put with a sub count
	const { id } = req.params;

	users
		.update(id, req.body)
		.then(function(subCount) {
			if (subCount > 0) {
				res.status(200).json({ updated: subCount });
			} else {
				res.status(404).json(null);
			}
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

userRouter.delete('/:id', function(req, res) {
	const { id } = req.params;

	users
		.remove(id)
		.then(function(subCount) {
			res.status(200).json({ subCount });
		})
		.catch(function(error) {
			res.status(500).json({ error });
		});
});

module.exports = userRouter;

const express = require('express');

const usersRouter = express.Router();

const db = require('../config/db.js');

var bcrypt = require('bcrypt');

usersRouter.get('/', function(req, res) {
	// /api/users/

	db('users')
		.then(function(records) {
			res.status(200).json(records);
		})
		.catch(function(err) {
			res.status(500).json({ error: 'Could not retrieve any users' });
		});
});

usersRouter.get('/:id', function(req, res) {
	// /api/users/:id
	const { id } = req.params;

	db('users')
		.where('id', id)
		.then(function(record) {
			if (record) {
				res.status(200).json(record);
			} else {
				res.status(404).json(null);
			}
		})
		.catch(function(err) {
			res.status(500).json({ error: 'User does not exist' });
		});
});

usersRouter.post('/newUser', function(req, res) {
	// /api/users/newUser
	const { username, password, email, phoneNumber, byEmail, byPhone } = req.body;
	const vcode = 12345678;
	const saltRounds = 10;
	
	bcrypt.hash(password, saltRounds, function(err, hash) {
		// Store hash in your password DB.
		db('users')
			.insert({ username, password: hash, email, phoneNumber, vcode, byEmail, byPhone })
			.then(function(record) {
				if (record) {
					res.status(200).json(record);
				} else {
					res.status(404).json(null);
				}
			})
			.catch(function(err) {
				res.status(500).json({ error: 'Could not create the user.', err });
			});
	});
});

module.exports = usersRouter;
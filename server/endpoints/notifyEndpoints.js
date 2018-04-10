const express = require('express');

const notifyRouter = express.Router();

const db = require('../config/db.js');

//return all users subscribed to groups with notify set to email
notifyRouter.get('/events/:eventId', function(req, res) {
  const { eventId } = req.params;

  db('groups as g')
    
    .innerJoin('eventSubscribers as s','g.id', '=', 's.groupId')
    .innerJoin('users as u','u.id','=', 's.userId')
    .where('g.completed', false)
    .select('g.name', 'g.time', 'u.username', 'u.email', 'u.phoneNumber')
    .then(function(record) {
      if (record) {
        res.status(200).json(record);
      } else {
      	res.status(404).json(null);
      }
      })
      .catch(function(err) {
      	res.status(500).json({ error: 'Could not join groups', err });
      });     
});

module.exports = notifyRouter;
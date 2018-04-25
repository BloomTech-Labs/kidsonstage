const express = require('express');

const invitesRouter = express.Router();

const db = require('../config/db.js');

invitesRouter.get('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .where('userId', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: `No event of ${eventId} for user` });
    });
});

invitesRouter.get('/events/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('userId', userId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No event invites for user' });
    });
});


invitesRouter.get('/events/:eventId', function(req, res) {
  const { eventId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No users in event' });
    });
});

invitesRouter.post('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .insert({ eventId, userId })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not Add user to group invites' });
    });
});

invitesRouter.delete('/events/:eventId/userId/:userId', function(req, res) {
  const { eventId, userId } = req.params;

  db('eventInvites')
    .where('eventId', eventId)
    .where('userId', userId)
    .del()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not Add user to group invites' });
    });
});

module.exports = invitesRouter;

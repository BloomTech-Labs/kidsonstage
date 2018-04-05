const express = require('express');

const eventsRouter = express.Router();

const db = require('../config/db.js');

eventsRouter.get('/', function(req, res) {
  db('events')
  .then(function(records) {
    res.status(200).json(records);
  })
  .catch(function(err) {
    res.status(500).json({ error: 'Could not retrieve any events' });
  });
});

eventsRouter.get('/:id', function(req, res) {
  const { id } = req.params;

  db('events')
    .where('id', id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not retrieve any events by that ID' });
    });
});

eventsRouter.get('/owner/:id', function(req, res) {
  const { id } = req.params;

  db('events')
    .where('owner', id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'No events by that owner ID' });
    });
});

eventsRouter.post('/newEvent', function(req, res) {
  const { owner, title, eventDate } = req.body;
// ADD FUNCTION FOR SETTING TIME / FRONT END CALANDER PICKER
  db('events')
    .insert({ owner, title, eventDate })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not add new event to DB', err});
    });
});

eventsRouter.delete('/delete', function(req, res) {
  const { id } = req.body;

  db('events')
    .where('id', id)
    .del()
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not delete event from DB', err});
    });
});

eventsRouter.get('/:id/activate', function(req, res) {
  const { id } = req.params;

  db('events')
    .where('id', id)
    .select('activated')
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Active record does not exist', err});
    });
});

// eventsRouter.put('/:id/activate', function(req, res) {
//   const { id } = req.params;
  
// });

eventsRouter.post('/:id/newGroup', function(req, res) {
  const { id } = req.params;
  const { eventId, name, time } = req.body;

  db('groups')
    .insert({ eventId: id, name, time })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not create new group', err});
    });
});

eventsRouter.get('/:id/groups', function(req, res) {
  const { id } = req.params;

  db('groups')
    .where('eventId', id)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not return any groups owned by event', err});
    });
});

eventsRouter.put('/:eventId/editGroup', function(req, res) {
  const { eventId } = req.params;
  const { id, name, time, completed } = req.body;

  db('groups')
    .where('eventId', eventId)
    .where('id', id)
    .update({ name, time, completed })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not return any groups owned by event', err});
    });
});

// CANT DELETE ATM PROBLEMS WITH "detail": "Key (id)=(1) is still referenced from table \"eventSubscribers\".",
// eventsRouter.delete('/:eventId/deleteGroup/:id', function(req, res) {
//   const { eventId, id } = req.params;

//   db('groups')
//     .where('eventId', eventId)
//     .select('id')
//     .del()
//     .then(function(records) {
//       res.status(200).json(records);
//     })
//     .catch(function(err) {
//       res.status(500).json({ error: 'Could not delete group', err});
//     });

// });

eventsRouter.get('/:eventId/groups/:groupId/subscribers', function(req, res) {
  const { eventId, groupId } = req.params;

  db('eventSubscribers')
    .where('eventId', eventId)
    .where('groupId', groupId)
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not return any subscribers in that group', err});
    });
});

eventsRouter.post('/:eventId/groups/:groupId/subscribe', function(req, res) {
  const { eventId, groupId } = req.params;
  const { userId } = req.body;
  
  db('eventSubscribers')
    .insert({ eventId, groupId, userId })
    .then(function(records) {
      res.status(200).json(records);
    })
    .catch(function(err) {
      // COME BACK HERE AND ADD MORE ERROR CATCHES FOR ALREADY SUBSCRIBED, NO EVENT, ETC
      res.status(500).json({ error: 'Could not subscribe to group', err});
    });
});

module.exports = eventsRouter;


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
    .where('g.eventId', eventId)
    .select('g.name', 'g.time', 'u.username', 'u.email', 'u.phoneNumber', 'u.byEmail', 'u.byPhone')
    .then(function(records) {
      if (records) {
        let endResults = [];

        let groupNames = records.map(item => item.name)
          .filter((value, index, self) => self.indexOf(value) === index);
        
        for (let i = 0; i < groupNames.length; i++) {
          let mainObject = {};
          let subscribers = [];

          for (let j = 0; j < records.length; j++) {
            if (records[j].name === groupNames[i]) {
              let subscriber = {};
              subscriber.email = records[j].email;
              subscriber.phoneNumber = records[j].phoneNumber;
              subscriber.byEmail = records[j].byEmail;
              subscriber.byPhone = records[j].byPhone;
              subscribers.push(subscriber);
            }
          }
          mainObject.name = groupNames[i];
          mainObject.subscribers = subscribers;
          endResults.push(mainObject);
        }
        
        res.status(200).json(endResults);
      } else {
      	res.status(404).json(null);
      }
    })
    .catch(function(err) {
      res.status(500).json({ error: 'Could not join groups', err });
    });     
});

module.exports = notifyRouter;
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const mongoose = require('mongoose');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const PORT = process.env.PORT || 5000;

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {

const apiRouter = require('./common/apiRouter.js');

const server = express();

server.use(cors());
server.use(bodyParser.json());

server.use('', apiRouter);

// const wss = new WebSocket.Server({ server });

// wss.on('connection', function connection(ws, req) {
//   const location = url.parse(req.url, true);
//   // You might use location.query.access_token to authenticate or share sessions
//   // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

//   ws.on('message', function incoming(message) {
//     console.log('received: %s', message);
//   });PORT

//   ws.send({PORT});
// });
const MongoClient = require('mongodb').MongoClient;
const AtlasMongoIUrl =
  'mongodb://LambdaDataManager:XPoCMUH4qMHINDKc@mongoi-shard-00-00-2ydlw.mongodb.net:27017,mongoi-shard-00-01-2ydlw.mongodb.net:27017,mongoi-shard-00-02-2ydlw.mongodb.net:27017/mongoi?ssl=true&replicaSet=mongoi-shard-0&authSource=admin';
//          'mongodb://BBData:1715m6kPqfppaHy4@bb-lambda0-shard-00-00-gdvzr.mongodb.net:27017,bb-lambda0-shard-00-01-gdvzr.mongodb.net:27017,bb-lambda0-shard-00-02-gdvzr.mongodb.net:27017/BBTest?ssl=true&replicaSet=BB-Lambda0-shard-0&authSource=admin';
//const accountCollection = 'BBCollection'
const accountCollection = 'accounts'
/*
MongoClient.connect(AtlasMongoIUrl, (err,db) => {
  if (err) {
    console.log('connect err:', err)
    throw err
  }
  */
//const collection = db.collection()
mongoose.Promise = global.Promise;
mongoose
  .connect(AtlasMongoIUrl + `&collection=${accountCollection}`, { useMongoClient: true })
  .then((db) => {
    // Priority serve any static files.
    server.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    console.log('All your databases are belong to us!');

    server.listen(PORT, function () {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(function (err) {
    console.log('Database connection failed', err.message);
  });
}
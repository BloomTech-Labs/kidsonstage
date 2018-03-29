const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const adminEndpoints = require('./admin/adminEndpoints.js');
const userEndpoints = require('./users/userEndpoints.js');

const PORT = process.env.PORT || process.env.LOCAL_PORT || 5000;

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
  const app = express();
  app.use(bodyParser.json());
  app.use(cors());

  app.use('/api/admin', adminEndpoints);
  app.use('/api/users', userEndpoints);
  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });


  if (process.env.NODE_ENV === 'production') {
    // Priority serve any static files.
    app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

    app.get('*', function(request, response) {
      response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
    });
  }

  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });
}

require('dotenv').config({path: '../.env'});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const adminEndpoints = require('./admin/adminEndpoints.js');
const userEndpoints = require('./users/userEndpoints.js');

const PORT = process.env.PORT || process.env.LOCAL_PORT;
const server = express();

server.use(bodyParser.json());
server.use(cors());

server.use('/api/admin', adminEndpoints);
server.use('/api/users', userEndpoints);

// USED FOR PRODUCTION ONLY
if (process.env.NODE_ENV === 'production') {
  // Priority serve any static files.
  server.use(express.static(path.resolve(__dirname, '../react-ui/build')));
  server.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
}

server.listen(PORT, () => console.log(`SERVER - running on port ${PORT}`));

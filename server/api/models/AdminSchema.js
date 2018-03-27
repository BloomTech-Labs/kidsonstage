const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({ //change this line
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
});

module.exports = mongoose.model('Admin', AdminSchema); // change this line
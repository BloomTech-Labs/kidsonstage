const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({ //change this line
  username: {
    type: String,
    required: true,
  },
  // depending on what we use for user Auth.  
  // email: {
  //   type: String,
  //   required: true,
  // },
  contact: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    email: {
      type: String,
    }
    //possibly have to add preferences? 
  },
});

module.exports = mongoose.model('User', UserSchema);
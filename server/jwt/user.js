const db = require('../config/db.js');

var bcrypt = require('bcrypt');
const saltRounds = 10;

class UserClass {
  constructor() {
    // this.findOne = this.findOne.bind(this);
    // this.findById = this.findById.bind(this);
    // this.checkPassword = this.checkPassword.bind(this);
    this.record = {};
  }
  get id () {
    console.log(`id this: ${this}`)
    return this.record.id;
  }
  findOne = (o, f) => {
    console.log(`findone username "${o.username}"`);
    return db('users')
      .where({ username: o.username })
      .then(function (record) {
        if (record) {
          console.log(`findOne this: ${this}`)
          // console.log(`_this: ${_this}`)
          User.record = record[0];
          return f(null, User);
        }
        return f(new Error("bad login"), null);
      })
      .catch(function (err) {
        console.log(`err: ${err}`);
        f(new Error(`User does not exist `), null);
      });
  }
  checkPassword = (password, f) => {
    // assumes findOne call before checkPassword
    bcrypt.compare(password, this.record.password, (err, res) => {
      if (res === true) {
        return f(null, res);
      }
      return f(err, null);
    });
  }
  findById = (id, f) => {
    console.log(`findById id ${id}`);
    return db('users')
      .where({ id })
      .then(record => {
        if (record) {
          User.record = record[0];
          return f(null, User);
        }
        return f(new Error(`${id} not found`), null);
      });
  }

}
var User = new UserClass();
console.log(`User: ${Object.keys(User)}`);
// console.log(`User.findOne: ${User.findOne}`);
// findOne
module.exports = { User };
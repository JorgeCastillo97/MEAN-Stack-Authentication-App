const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database.js');

// Creates a User schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id, callback) {
  User.findById(id, callback);
};

module.exports.getUserByUsername = function (usrname, callback) {
  const query = {username: usrname}
  User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
  bcrypt.genSalt(10, (saltErr,salt) => {
    if(saltErr) {
      console.log("Error occurred during genSalt(): " + saltErr);
    } else {
      bcrypt.hash(newUser.password, salt, (hashErr, hash) => {
        if (hashErr) {
          console.log("Error occurred during hash(): " + hashErr);
        } else {
          // Saves the hash as the newUser's password
          newUser.password = hash;
          newUser.save(callback);
        }
      });
    }
  });
};

module.exports.comparePassword = function (formPass, hash, callback) {
  bcrypt.compare(formPass, hash, (err, matches) => {
    if (err) {
      console.log("Error occurred during password comparisson: " + err);
    }
    callback(matches);
  });
}

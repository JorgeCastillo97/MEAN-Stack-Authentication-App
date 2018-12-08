const express = require('express');
const router = express.Router();
// Import User Model
const User = require('../models/user.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');


/*
Register
Endpoint --> /users/register
*/
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password    //Plaintext password
  });

  // Add the new User Object to the database
  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({
        success: false,
        message: "Failed to register user."
      });
    } else {
      res.json({
        success: true,
        message: "User registered!"
      });
    }
  });
  //res.end();
});

/*
Authenticate
Endpoint --> /users/authenticate
*/
router.post('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE ENDPOINT.');
  res.end();
});

/*
Profile
Endpoint --> /users/profile
*/
router.get('/profile', (req, res, next) => {
  res.send('PROFILE ENDPOINT.');
  res.end();
});

module.exports = router;

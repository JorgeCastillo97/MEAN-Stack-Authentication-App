const express = require('express');
const router = express.Router();

// Imports User Model
const User = require('../models/user.js');

// Imports the DB config file
const config = require('../config/database.js');

// Passport Middleware
const passport = require('passport');

// JWT-Token Middleware
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

  // Adds the new User Object to the database
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
  const username = req.body.username;
  const password = req.body.password;

  // Gets the user by the username
  User.getUserByUsername(username, (err, user) => {
    if (err) {
      console.log("Error occurred during user searching: " + err);
    }
    if (!user) {
       return res.json({
        success: false,
        message: "User not found."
      });
    } else {
      // Continues to check the password
      User.comparePassword(password, user.password, (matches) => {
        if (matches) {
          // Creates the jwt-token
          const token = jwt.sign(user.toJSON(), config.secret, {
            // Options
            expiresIn: 1800,   // Expires in 30 minutes
          });

          res.json({
            success: true,
            message: "User found!",
            token: 'JWT ' + token,
            // Sends the User Object back
            user: {
              id: user._id,
              name: user.name,
              username: user.username,
              email: user.email
            }
          });
        } else {
           return res.json({
            success: false,
            message: "Wrong password."
          });
        }
      });
    }
  });
});

/*
Profile
Endpoint --> /users/profile
*/
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.send(req.user);
  //res.end();
});

module.exports = router;

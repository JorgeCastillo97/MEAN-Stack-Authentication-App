const express = require('express');
const router = express.Router();

/*
Register
Endpoint --> /users/register
*/
router.get('/register', (req, res, next) => {
  res.send('REGISTER ENDPOINT');
});

/*
Authenticate
Endpoint --> /users/authenticate
*/
router.get('/authenticate', (req, res, next) => {
  res.send('AUTHENTICATE ENDPOINT.');
});

/*
Profile
Endpoint --> /users/profile
*/
router.get('/profile', (req, res, next) => {
  res.send('PROFILE ENDPOINT.');
});

/*
Validate
Endpoint --> /users/validate
*/
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE ENDPOINT.');
});

module.exports = router;

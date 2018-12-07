const express = require('express');
const router = express.Router();

/*
Register
Endpoint --> /users/register
*/
router.get('/register', (req, res, next) => {
  res.send('REGISTER ENDPOINT');
  res.end();
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

/*
Validate
Endpoint --> /users/validate
*/
router.get('/validate', (req, res, next) => {
  res.send('VALIDATE ENDPOINT.');
  res.end();
});

module.exports = router;

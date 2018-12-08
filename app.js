const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database.js');

const app = express();

// Database Connection
mongoose.connect(config.database, { useNewUrlParser: true });

// Connection Check
mongoose.connection.on('connected', () => {
  console.log('Connected to database ' + config.database);
});

// On connection error
mongoose.connection.on('error', (err) => {
  console.log('Database connection error: ' + err);
});

const users = require('./routes/users');

// Port Number
const PORT = 9000;

// CORS Middleware
app.use(cors());

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.js')(passport);

app.use('/users', users);

// Sets Static Folder
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
  res.end('Invalid endpoint!');
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});

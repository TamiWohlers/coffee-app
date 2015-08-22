'use strict';

// Dependencies; get the packages we need
var express = require('express');

// Initate our app
var app = express();


// Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:8000/api
router.get('/', function(req, res) {
  res.json({ message: 'Hello!' });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
// Use environment defined port or 8000
var port = process.env.PORT || 8000;

app.listen(port);
console.log('Listening to port ' + port);


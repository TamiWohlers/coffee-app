'use strict';

// Dependencies; get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Models
var Coffee = require('./models/coffee');

// Initate our app
var app = express();

//Middleware
app.use('/', bodyParser.json());

// Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:8000/api
router.get('/', function(req, res) {
  res.json({ message: 'Hello!' });
});

// Register all our routes with /api
app.use('/api', router);

// Create a new route with the prefix /coffee
var coffeeRoute = router.route('/coffee');

// Create endpoint /api/coffee for POSTS
coffeeRoute.post(function(req, res) {
  // Create a new instance of the Coffee model
  var coffee = new Coffee();

  // Set the coffee properties that came from the POST data
  coffee.name = req.body.name;
  coffee.type = req.body.type;
  coffee.quantity = req.body.quantity;

  // Save the coffee and check for errors
  coffee.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Coffee Added!', data: coffee });
  });
});

// Create endpoint /api/coffee for GET
coffeeRoute.get(function(req, res) {
  // Use the Coffee model to find all coffee
  Coffee.find(function(err, coffee) {
    if (err)
      res.send(err);

    res.json(coffee);
  });
});

// Create a new route with the /coffee/:coffee_id prefix
var coffeeRoute = router.route('/coffee/:coffee_id');

// Create endpoint /api/coffee/:coffee_id for GET
coffeeRoute.get(function(req, res) {
  // Use the Coffee model to find a specific coffee
  Coffee.findById(req.params.coffee_id, function(err, coffee) {
    if (err)
      res.send(err);

    res.json(coffee);
  });
});

// Create endpoint /api/coffee/:coffee_id for PUT
coffeeRoute.put(function(req, res) {
  // Use the Coffee model to find a specific coffee
  Coffee.findById(req.params.coffee_id, function(err, coffee) {
    if (err)
      res.send(err);

    // Update the existing coffee quantity
    coffee.quantity = req.body.quantity;

    // Save the coffee and check for errors
    coffee.save(function(err) {
      if (err)
        res.send(err);

      res.json(coffee);
    });
  });
});

// Create endpoint /api/coffee/:coffee_id for DELETE
coffeeRoute.delete(function(req, res) {
  // Use the Coffee model to find a specific coffee and remove it
  Coffee.findByIdAndRemove(req.params.coffee_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Delete coffee from database' });
  });
});

// Connect to the coffee-app MongoDB
mongoose.connect('mongodb://localhost:27017/coffee-app');

// Start the server
// Use environment defined port or 8000
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening to port ' + port);


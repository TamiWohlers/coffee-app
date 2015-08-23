'use strict';

// Dependencies; get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Controllers
var CoffeeCtrl = require("./controllers/CoffeeCtrl");
var UserCtrl = require('./controllers/UserCtrl');

// Initate our app
var app = express();

//Middleware
app.use('/', bodyParser.json());

// Express router
var router = express.Router();

// Register all our routes with /api
app.use('/api', router);

/********************************************
 - START ENDPOINTS -
********************************************/

// Create endpoint handlers for /coffee
router.route('/coffee')
  .post(CoffeeCtrl.create)
  .get(CoffeeCtrl.read);

// Create endpoint handlers for /coffee/:coffee_id
router.route('/coffee/:coffee_id')
  .get(CoffeeCtrl.read)
  .put(CoffeeCtrl.update)
  .delete(CoffeeCtrl.remove);

// Create endpoint handlers for /users
router.route('/users')
  .post(UserCtrl.create)
  .get(UserCtrl.read);

/********************************************
 - END ENDPOINTS -
********************************************/

// Connect to the coffee-app MongoDB
mongoose.connect('mongodb://localhost:27017/coffee-app');

// Start the server
// Use environment defined port or 8000
var port = process.env.PORT || 8000;
app.listen(port);
console.log('Listening to port ' + port);
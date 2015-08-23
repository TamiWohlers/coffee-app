'use strict';

// Dependencies; get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

// Controllers
var CoffeeCtrl = require("./controllers/CoffeeCtrl");
var UserCtrl = require('./controllers/UserCtrl');
var AuthCtrl = require('./controllers/AuthCtrl');

// Initate our app
var app = express();

// Express router
var router = express.Router();

//Middleware
app.use('/', bodyParser.json());
// Register all our routes with /api
app.use('/api', router);
// Use the passport package in our application
app.use(passport.initialize());


/********************************************
 - START ENDPOINTS -
********************************************/

// Create endpoint handlers for /coffee
router.route('/coffee')
  .post(AuthCtrl.isAuthenticated, CoffeeCtrl.create)
  .get(AuthCtrl.isAuthenticated, CoffeeCtrl.read);

// Create endpoint handlers for /coffee/:coffee_id
router.route('/coffee/:coffee_id')
  .get(AuthCtrl.isAuthenticated, CoffeeCtrl.read)
  .put(AuthCtrl.isAuthenticated, CoffeeCtrl.update)
  .delete(AuthCtrl.isAuthenticated, CoffeeCtrl.remove);

// Create endpoint handlers for /users
router.route('/users')
  .post(UserCtrl.create)
  .get(AuthCtrl.isAuthenticated, UserCtrl.read);

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
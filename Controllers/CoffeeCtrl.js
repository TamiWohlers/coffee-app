var Coffee = require('../models/coffee.js');

module.exports = {


	// Create endpoint /api/coffee for POSTS
	create: function(req, res) {
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
	},

	// Create endpoint /api/coffee for GET
	read: function(req, res) {
	  // Use the Coffee model to find all coffee
	  Coffee.find(function(err, coffee) {
	    if (err)
	      res.send(err);

	    res.json(coffee);
	  });
	},

	// Create endpoint /api/coffee/:coffee_id for GET
	read: function(req, res) {
	  // Use the Coffee model to find a specific coffee
	  Coffee.findById(req.params.coffee_id, function(err, coffee) {
	    if (err)
	      res.send(err);

	    res.json(coffee);
	  });
	},

	// Create endpoint /api/coffee/:coffee_id for PUT
	update: function(req, res) {
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
	},

	// Create endpoint /api/coffee/:coffee_id for DELETE
	remove: function(req, res) {
	  // Use the Coffee model to find a specific coffee and remove it
	  Coffee.findByIdAndRemove(req.params.coffee_id, function(err) {
	    if (err)
	      res.send(err);

	    res.json({ message: 'Delete coffee from database' });
	  });
	}
};
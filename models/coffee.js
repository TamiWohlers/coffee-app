// Load required packages
var mongoose = require('mongoose');

// Define our coffee schema
var CoffeeSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Coffee', CoffeeSchema);
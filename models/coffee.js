// Load required packages
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define our coffee schema
var CoffeeSchema = new mongoose.Schema({
  name: String,
  type: String,
  quantity: Number,
  userId: String
});

// Export the Mongoose model
module.exports = mongoose.model('Coffee', CoffeeSchema);